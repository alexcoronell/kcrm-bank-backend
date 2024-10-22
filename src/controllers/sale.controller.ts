import { Request, Response } from "express";

import { Sale } from "../entities/Sale.entity";

export const create = async (req: Request, res: Response) => {
  try {
    const { quotaRequested, rate, product, franchise, user } = req.body;
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
  try {
    const sales = await Sale.find();
    return res.json(sales);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const sale = await Sale.findOneBy({ id });
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
    const id: number = parseInt(req.params.id);
    const sale = await Sale.findOneBy({ id });
    if (!sale) return res.status(404).json({ message: "Sale does not exist" });
    const { quotaRequested, rate, product, franchise, user } = req.body;
    const body = {
      quotaRequested, rate, product, franchise, updatedBy: user
    };
    Sale.update({id}, body)
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    console.log(id);
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
