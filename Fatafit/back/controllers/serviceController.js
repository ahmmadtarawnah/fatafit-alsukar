const Service = require("../models/Service");

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
      error: error.message,
    });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Validate required fields
    if (!name || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, description, and image",
      });
    }

    const service = await Service.create({
      name,
      description,
      image,
      // requestedBy starts as an empty array as per the schema
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const { name, description, image, isDeleted } = req.body;
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, image, isDeleted },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};

// Soft delete a service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Soft delete by setting isDeleted to true
    await Service.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};

// Request a service (add user to requestedBy array)
exports.requestService = async (req, res) => {
  try {
    const { userId } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check if user already requested this service
    if (service.requestedBy.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User has already requested this service",
      });
    }

    // Add user to requestedBy array
    service.requestedBy.push(userId);
    await service.save();

    res.status(200).json({
      success: true,
      message: "Service requested successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to request service",
      error: error.message,
    });
  }
};
