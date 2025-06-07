import Alumni from "../models/alumni.model.js";


// Escape special characters in the regex input
function escapeRegExp(string) {
    return string.replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&');
  }
  
  export const searchAlumni = async (req, res, next) => {
    try {
      const { name, company, experience, industry, branch } = req.query;
  
      // Escape any special characters in the query parameters
      const safeName = name ? escapeRegExp(name) : '';
      const safeCompany = company ? escapeRegExp(company) : '';
      const safeIndustry = industry ? escapeRegExp(industry) : '';
      const safeBranch = branch ? escapeRegExp(branch) : '';
  
      // Create the filter object
      const filter = {};
  
      // Handle name and company filters
      if (safeName) filter.name = { $regex: safeName, $options: "i" };
      if (safeCompany) filter.company = { $regex: safeCompany, $options: "i" };
      if (safeIndustry) filter.industry = { $regex: safeIndustry, $options: "i" };
      if (safeBranch) filter.branch = { $regex: safeBranch, $options: "i" };
  
      // Handle experience range filter (e.g., "0-5" or "5-10")
      if (experience) {
        const experienceRange = experience.split('-').map((exp) => parseInt(exp, 10));
        
        // If experience range is valid, filter by range
        if (experienceRange.length === 2 && !isNaN(experienceRange[0]) && !isNaN(experienceRange[1])) {
          filter.experience = {
            $gte: experienceRange[0],  // Greater than or equal to min experience
            $lte: experienceRange[1],  // Less than or equal to max experience
          };
        }
      }
  
      // Perform the search query on the Alumni collection
      const alumni = await Alumni.find(filter).select('name company experience industry branch email');
  
      // Handle no results
      if (alumni.length === 0) {
        return res.status(404).json({ message: "No alumni found matching your criteria." });
      }
  
      // Return the search results
      res.status(200).json(alumni);
    } catch (error) {
      console.error("Error during alumni search:", error);
      next(error); // Pass error to the next middleware (error handler)
    }
  };
  
export const allAlumni = async (req, res, next) => {
    try {
        const alumni = await Alumni.find().select('name company experience industry branch email');
          console.log("Alumni fetched from DB:", alumni);
        res.status(200).json(alumni);
    } catch (error) {
        next(error);
    }
};

 
