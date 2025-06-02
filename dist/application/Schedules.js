"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedules = void 0;
const SchedulesRep_1 = require("../repository/SchedulesRep");
class Schedules {
    async create(req, res) {
        const { cod, saida, chegada, retorno } = req.body;
        if (!cod || !saida || !chegada || !retorno) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        try {
            const today = new Date().toISOString().split('T')[0];
            const toBrasiliaDate = (time) => {
                const fullDate = new Date(`${today}T${time}:00`);
                fullDate.setHours(fullDate.getHours() - 3);
                return fullDate;
            };
            const saidaDate = toBrasiliaDate(saida);
            const chegadaDate = toBrasiliaDate(chegada);
            const retornoDate = toBrasiliaDate(retorno);
            const schedules = SchedulesRep_1.schedulesRep.create({
                cod,
                saida: saidaDate,
                chegada: chegadaDate,
                retorno: retornoDate,
            });
            await SchedulesRep_1.schedulesRep.save(schedules);
            return res.status(201).json('Request completed successfully');
        }
        catch (error) {
            console.error("Error creating schedule:", error);
            return res.status(500).json({ message: "Error creating schedule", error });
        }
        finally {
            console.log('request completed successfully');
        }
    }
    async update(req, res) {
        const { id, cod, saida, chegada, retorno } = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID parameter is required." });
        }
        if (!id || !cod || !saida || !chegada || !retorno) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        try {
            const schedule = await SchedulesRep_1.schedulesRep.findOneBy({ id: Number(id) });
            if (!schedule) {
                return res.status(404).json({ message: "Schedule not found." });
            }
            const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
            const toBrasiliaDate = (time) => {
                const fullDate = new Date(`${today}T${time}:00`);
                fullDate.setHours(fullDate.getHours() - 3); // Corrige fuso UTC-3
                return fullDate;
            };
            schedule.cod = cod;
            schedule.saida = toBrasiliaDate(saida);
            schedule.chegada = toBrasiliaDate(chegada);
            schedule.retorno = toBrasiliaDate(retorno);
            await SchedulesRep_1.schedulesRep.save(schedule);
            return res.status(200).json('Update request completed successfully');
        }
        catch (error) {
            console.error("Error updating schedule:", error);
            return res.status(500).json({ message: "Error updating schedule", error });
        }
        finally {
            console.log('update request completed successfully');
        }
    }
    async findall(req, res) {
        try {
            const schedules = await SchedulesRep_1.schedulesRep.find({
                order: {
                    cod: 'ASC',
                }
            });
            if (!schedules || schedules.length === 0) {
                return res.status(400).json({ message: "No records found." });
            }
            const formatTime = (date) => {
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
        }
        catch (error) {
            console.error("Error fetching schedules:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
    async delete(req, res) {
        const { id } = req.body;
        if (!id)
            return res.status(400).json({ message: "Mandatory ID." });
        const schedules = await SchedulesRep_1.schedulesRep.findOneBy({ id: Number(id) });
        if (!schedules)
            return res.status(400).json({ message: "ID not found." });
        await SchedulesRep_1.schedulesRep.delete(id);
        return res.status(201).json({ message: schedules?.cod + " Successfully deleted." });
    }
}
exports.Schedules = Schedules;
