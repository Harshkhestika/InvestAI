const Investment = require('../models/Investment');

const addInvestment = async (req, res) => {
  const { company, amount, buyingPrice, quantity, date } = req.body;

  try {
    const investment = await Investment.create({
      userId: req.user.id,
      company,
      amount,
      buyingPrice,
      quantity,
      date,
    });
    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInvestment = async (req, res) => {
  const { company, amount, buyingPrice, quantity, date } = req.body;
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    if (investment.userId.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });

    investment.company = company || investment.company;
    investment.amount = amount || investment.amount;
    investment.buyingPrice = buyingPrice || investment.buyingPrice;
    investment.quantity = quantity || investment.quantity;
    if (date) investment.date = date;

    const updatedInvestment = await investment.save();
    res.json(updatedInvestment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    if (investment.userId.toString() !== req.user.id) return res.status(401).json({ message: 'User not authorized' });

    await investment.deleteOne();
    res.json({ message: 'Investment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment,
};
