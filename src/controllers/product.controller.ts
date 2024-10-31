import type { Request, Response } from "express";

/* Entities */
import { Product } from "../entities/Product.entity";

/* Helpers */
import pagination from "../helpers/pagination.helper";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, rateRequired, franchiseRequired } = req.body;
    const product = new Product();
    product.name = name;
    product.rateRequired = rateRequired
    product.franchiseRequired = franchiseRequired
    await product.save();
    return res.status(201).json(product);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const countTotal = async (req: Request, res: Response) => {
  try {
    const total = await Product.count({
      where: { deleted: false },
    });
    return res.status(200).json(total);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  const { take, skip } = pagination(req);

  try {
    const products = await Product.findAndCount({
      where: { deleted: false },
      order: { id: "DESC" },
      take,
      skip,
    });
    const [items, count] = products;
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
    const product = await Product.findOneBy({ id });
    if (!product)
      return res.status(404).json({ message: "Product does not exist" });
    return res.json(product);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const product = await Product.findOneBy({ id });
    if (!product)
      return res.status(404).json({ message: "Product does not exist" });
    const { name, rateRequired, franchiseRequired, active } = req.body;
    await Product.update({ id }, { name, rateRequired, franchiseRequired, active });
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
    const product = await Product.findOneBy({ id });
    if (!product)
      return res.status(404).json({ message: "Product does not exist" });
    await Product.update({ id }, { deleted: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};
