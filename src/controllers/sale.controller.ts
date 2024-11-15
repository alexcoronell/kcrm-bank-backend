import type { Request, Response } from "express";

/* Entities */
import { Sale } from "../entities/Sale.entity";

/* Helpers */
import pagination from "../helpers/pagination.helper";

export const create = async (req: Request, res: Response) => {
  try {
    const {
      quotaRequested,
      rate,
      product,
      franchise,
      createdBy: user,
    } = req.body;
    const sale = new Sale();
    sale.quotaRequested = quotaRequested;
    sale.rate = rate;
    sale.product = product;
    sale.franchise = franchise;
    sale.createdBy = user;
    sale.updatedBy = user;
    await sale.save();
    return res.json(sale);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  const { take, skip } = pagination(req);

  try {
    const sales = await Sale.findAndCount({
      where: { deleted: false },
      order: { id: "DESC" },
      relations: ["franchise", "product", "createdBy", "updatedBy"],
      take,
      skip,
    });
    const [items, count] = sales;

    return res.status(200).json({ items, count });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const sale = await Sale.findOne({
      where: { id, deleted: false },
      relations: ["franchise", "product", "createdBy", "updatedBy"],
    });
    if (!sale) return res.status(404).json({ message: "Sale does not exist" });
    return res.json(sale);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const sale = await Sale.findOneBy({ id });
    if (!sale) return res.status(404).json({ message: "Sale does not exist" });
    const { quotaRequested, rate, product, franchise, updatedBy } = req.body;
    const body = {
      quotaRequested,
      rate,
      product,
      franchise,
      updatedBy,
    };
    Sale.update({ id }, body);
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const sale = await Sale.findOneBy({ id });
    if (!sale) return res.status(404).json({ message: "Sale does not exist" });
    await Sale.update({ id }, { deleted: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};
