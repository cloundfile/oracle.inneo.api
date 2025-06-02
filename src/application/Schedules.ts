import { Request, Response } from 'express';
import { schedulesRep } from '../repository/SchedulesRep';

export class Schedules {
    async create(req: Request, res: Response) {
        const { cod, saida, chegada, retorno } = req.body;

        if (!cod || !saida || !chegada || !retorno) {
            return res.status(400).json({ message: "Fields with * required." });
        }

        try {
            const today = new Date().toISOString().split('T')[0];

            const toBrasiliaDate = (time: string): Date => {
                const fullDate = new Date(`${today}T${time}:00`);
                fullDate.setHours(fullDate.getHours() - 0);
                return fullDate;
            };

            const saidaDate = toBrasiliaDate(saida);
            const chegadaDate = toBrasiliaDate(chegada);
            const retornoDate = toBrasiliaDate(retorno);

            const schedules = schedulesRep.create({
                cod,
                saida: saidaDate,
                chegada: chegadaDate,
                retorno: retornoDate,
            });

            await schedulesRep.save(schedules);

            return res.status(201).json('Request completed successfully');

        } catch (error) {
            console.error("Error creating schedule:", error);
            return res.status(500).json({ message: "Error creating schedule", error });
        } finally {
            console.log('request completed successfully');
        }
    }

    async update(req: Request, res: Response) {
        const { id, cod, saida, chegada, retorno } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID parameter is required." });
        }

        if (!id || !cod || !saida || !chegada || !retorno) {
            return res.status(400).json({ message: "Fields with * required." });
        }

        try {
            const schedule = await schedulesRep.findOneBy({ id: Number(id) });

            if (!schedule) {
                return res.status(404).json({ message: "Schedule not found." });
            }

            const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

            const toBrasiliaDate = (time: string): Date => {
                const fullDate = new Date(`${today}T${time}:00`);
                fullDate.setHours(fullDate.getHours() - 0); // Corrige fuso UTC-3
                return fullDate;
            };

            schedule.cod = cod;
            schedule.saida = toBrasiliaDate(saida);
            schedule.chegada = toBrasiliaDate(chegada);
            schedule.retorno = toBrasiliaDate(retorno);

            await schedulesRep.save(schedule);

            return res.status(200).json('Update request completed successfully');

        } catch (error) {
            console.error("Error updating schedule:", error);
            return res.status(500).json({ message: "Error updating schedule", error });
        } finally {
            console.log('update request completed successfully');
        }
    }

    async findall(req: Request, res: Response) {
        try {
            const schedules = await schedulesRep.find({
                order: {
                    cod: 'ASC',
                }
            });

            if (!schedules || schedules.length === 0) {
                return res.status(400).json({ message: "No records found." });
            }

            const formatTime = (date: Date): string => {
                const hours = date.getUTCHours().toString().padStart(2, '0');
                const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            };

            const formattedSchedules = schedules.map(s => ({
                id: s.id,
                cod: s.cod,
                saida: formatTime(s.saida),
                chegada: formatTime(s.chegada),
                retorno: formatTime(s.retorno)
            }));

            return res.json(formattedSchedules);
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
        return res.status(201).json({ message: schedules?.cod + " Successfully deleted." });
    }
}