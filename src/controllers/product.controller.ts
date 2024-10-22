import { Request, Response } from "express";

import { Product } from "../entities/Product.entity";

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const product = new Product();
    product.name = name;
    await product.save();
    return res.json(product);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
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
    const id: number = parseInt(req.params.id);
    const product = await Product.findOneBy({ id });
    if (!product)
      return res.status(404).json({ message: "Product does not exist" });
    const { name } = req.body;
    await Product.update({ id }, { name });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const activate = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await Product.findOneBy({ id });
    if (!product)
      return res.status(404).json({ message: "Product does not exist" });
    await Product.update({ id }, { active: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const deactivate = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await Product.findOneBy({ id });
    if (!product)
      return res.status(404).json({ message: "Product does not exist" });
    await Product.update({ id }, { active: false });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
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
