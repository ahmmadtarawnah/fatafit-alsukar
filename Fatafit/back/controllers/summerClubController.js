const SummerClub = require('../models/SummerClub');

exports.createSummerClub = async (req, res) => {
  try {
    const { title, moreInfo, maxChildren, costPerChild } = req.body;
    const image = req.file ? req.file.filename : null;
    const club = await SummerClub.create({ title, moreInfo, maxChildren, costPerChild, image });
    res.status(201).json({ message: 'تم إضافة النادي الصيفي بنجاح', club });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إضافة النادي الصيفي', error: error.message });
  }
};

exports.getAllSummerClubs = async (req, res) => {
  try {
    const clubs = await SummerClub.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب النوادي الصيفية', error: error.message });
  }
};

exports.getSummerClub = async (req, res) => {
  try {
    const club = await SummerClub.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'النادي غير موجود' });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب بيانات النادي', error: error.message });
  }
};

exports.registerForClub = async (req, res) => {
  try {
    const club = await SummerClub.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'النادي غير موجود' });
    if (club.registrations.length >= club.maxChildren) {
      return res.status(400).json({ message: 'النادي ممتلئ ولا يمكن التسجيل حالياً' });
    }
    const { name, email, mobile } = req.body;
    const registration = { name, email, mobile, paid: false };
    club.registrations.push(registration);
    await club.save();
    
    // Get the registration ID (it's the last one added)
    const registrationId = club.registrations[club.registrations.length - 1]._id;
    
    res.json({ 
      message: 'تم التسجيل بنجاح. يرجى إتمام الدفع.', 
      club,
      registrationId 
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء التسجيل', error: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { registrationId } = req.body;
    const club = await SummerClub.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'النادي غير موجود' });
    }

    const registration = club.registrations.id(registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'التسجيل غير موجود' });
    }

    registration.paid = true;
    await club.save();

    res.json({ 
      message: 'تم تأكيد الدفع بنجاح',
      club 
    });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تأكيد الدفع', error: error.message });
  }
};

exports.deleteSummerClub = async (req, res) => {
  try {
    const club = await SummerClub.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: 'النادي غير موجود' });
    res.json({ message: 'تم حذف النادي الصيفي بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف النادي الصيفي', error: error.message });
  }
}; 