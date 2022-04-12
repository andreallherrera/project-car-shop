import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400)
          .json({ error: 'Id must have 24 hexadecimal characters' });
      }
      const car = await this.service.readOne(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const car = await this.service.read();
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string, obj: Car }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id, obj } = req.params;
    try {
      const car = await this.service.update(id, obj);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.delete(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
