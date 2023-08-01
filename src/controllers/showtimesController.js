const { sequelize, connectDatabase } = require('../configs/db.js');
const Movie = require('../models/movie.model');
const Showtime = require('../models/showtime.model');

// Fetch showtimes for a theatre for a specific date
const getShowsForDate = async (req, res) => {
  const { theatreId, date } = req.params;
  try {
    const showDate = new Date(date);

    const showtimes = await Showtime.findAll({
      where: {
        theatreId: theatreId,
        date: showDate,
      },
    });

    return res.json(showtimes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Fetch showtimes for a theatre (next 7 days)
const getShowsForWeek = async (req, res) => {
  const { theatreId } = req.params;
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    const showtimes = await Showtime.findAll({
      where: {
        theatreId: theatreId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    return res.json(showtimes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const bookSeat = async (req, res) => {
  const { showtimeId, seatNumbers } = req.body;

  try {
    const showtime = await Showtime.findByPk(showtimeId);

    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    // Check if the seats are available
    const unavailableSeats = seatNumbers.filter(
      (seatNumber) =>
        showtime.bookedSeats.includes(seatNumber) ||
        !showtime.seats.includes(seatNumber)
    );

    if (unavailableSeats.length > 0) {
      return res
        .status(400)
        .json({ error: `Seats ${unavailableSeats.join(", ")} are not available` });
    }

    // Start a transaction to ensure atomicity and isolation
    await sequelize.transaction(async (t) => {
      // Lock the selected showtime row for update
      const lockedShowtime = await Showtime.findByPk(showtimeId, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      if (!lockedShowtime) {
        throw new Error("Showtime not found");
      }

      // Update the bookedSeats array with the newly booked seats
      lockedShowtime.bookedseats = [
        ...lockedShowtime.bookedseats,
        ...seatNumbers,
      ];
      // Remove the booked seats from the available seats
      lockedShowtime.seats = lockedShowtime.seats.filter(
        (seat) => !seatNumbers.includes(seat)
      );

      await lockedShowtime.save({ transaction: t });
    });

    return res.json({ message: "Seats booked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {getShowsForDate, getShowsForWeek, bookSeat}