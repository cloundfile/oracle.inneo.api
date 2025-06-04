import { Request, Response } from 'express';
import { schedulesRep } from '../repository/SchedulesRep';

export class Schedules {
    async create(req: Request, res: Response) {
        const { codigo, partida, chegada, retorno } = req.body;

        if (!codigo || !partida || !chegada || !retorno) {
            return res.status(400).json({ message: "Fields with * required." });
        }

        try {
            const schedule = schedulesRep.create({
                codigo,
                partida,
                chegada,
                retorno,
            });

            await schedulesRep.save(schedule);

            return res.status(201).json({ message: `Success ${codigo} completed.`});

        } catch (error) {
            console.error("Error creating schedule:", error);
            return res.status(500).json({ message: "Error creating schedule", error });
        } finally {
            console.log('request completed successfully');
        }
    }

    async update(req: Request, res: Response) {
        const { id, codigo, partida, chegada, retorno } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID parameter is required." });
        }

        if (!id || !codigo || !partida || !chegada || !retorno) {
            return res.status(400).json({ message: "Fields with * required." });
        }

        try {
            const schedule = await schedulesRep.findOneBy({ id: Number(id) });

            if (!schedule) {
                return res.status(404).json({ message: "Schedule not found." });
            }

            schedule.codigo  = codigo;
            schedule.partida = partida;
            schedule.chegada = chegada;
            schedule.retorno = retorno;

            await schedulesRep.save(schedule);

            return res.status(200).json({ message: `Success update ${codigo} completed.`});

        } catch (error) {
            console.error("Error updating schedule:", error);
            return res.status(500).json({ message: "Error updating schedule", error });
        } finally {
            console.log('update request completed successfully');
        }
    }

    async findOneBy(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const schedules = await schedulesRep.findOneBy({ id: id});
            

            if(!schedules) return res.status(400).json({ message: "No records found." });

            const response = {
                id: schedules.id,
                cod: schedules.codigo,
                saida: schedules.partida,
                chegada: schedules.chegada,
                retorno: schedules.retorno
            };

            return res.json(response);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    }

    async findall(req: Request, res: Response) {
        try {
            const schedules = await schedulesRep.find({
                order: {
                    codigo: 'ASC',
                    partida: 'ASC'
                }
            });

            if (!schedules || schedules.length === 0) {
                return res.status(400).json({ message: "No records found." });
            }

            return res.json(schedules);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "Mandatory ID." });

        const schedules = await schedulesRep.findOneBy({ id: Number(id) });
        if (!schedules) return res.status(400).json({ message: "ID not found." });

        await schedulesRep.delete(id);
        return res.status(201).json({ message: schedules?.codigo + " Successfully deleted." });
    }
}