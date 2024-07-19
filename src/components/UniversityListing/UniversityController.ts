// ListingController.ts

import UniversityService from "./UniversityService";
// import University from "../../models/University";

class UniversityController {
  static async fetchUniversities() {
    return await UniversityService.fetchAndCacheUniversities();
  }
}

export default UniversityController;
