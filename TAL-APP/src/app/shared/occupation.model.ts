import { OccupationRating } from "./occupation-rating.model";

export class Occupation {
    occupationId: number=0;
    occupationName: string='';
    occupationRatingRefId: number=0;
    occupationRating: OccupationRating;
  }