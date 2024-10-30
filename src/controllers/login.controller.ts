import * as bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

/* Entities */
import { User } from "../entities/User.entity";
import type { UserType } from "../entities/UserType.entity";

/* Models */
import type { TokenDto } from "../dtos/token.dto";

/* Interfaces */
import type { PayloadToken } from "../interfaces/PayloadToken.interface";

const secret: string = process.env.SECRET_JWT_KEY as string;

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			relations: ["userType"],
			where: { email, deleted: false, active: true },
		});
		if (!user) return res.status(404).json({ message: "Invalid Login" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (user && isMatch) {
			const { accessToken, publicUser } = generateJWT(user);
			console.log(secret);
			return res
				.cookie("access_token", accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
					maxAge: 1000 * 60 * 60,
				})
				.send({ user: publicUser, accessToken });
		}
		return res.status(404).json({ message: "Invalid Login" });
	} catch (e) {
		if (e instanceof Error) {
			return res.status(500).json({ message: e.message });
		}
	}
};

const generateJWT = (user: User) => {
	const { id, userType } = user;
	const { isAdmin } = userType as unknown as UserType;
	const expiresIn = 60;
	const payload = { user: id, isAdmin };
	const { password, ...publicUser } = user;
	return { accessToken: jwt.sign(payload, secret, { expiresIn }), publicUser };
};

const generateRefreshToken = (payload: PayloadToken) => {
	const expiresIn = 86400;
	return jwt.sign(payload, secret, { expiresIn });
};

const refreshToken = (dto: TokenDto) => {
	const expiresIn = 60;
	const userToken = jwt.decode(dto.refresh);
	const { user, isAdmin } = userToken as PayloadToken;
	const payload: PayloadToken = { user, isAdmin };
	return { accessToken: jwt.sign(payload, secret, { expiresIn }) };
};
