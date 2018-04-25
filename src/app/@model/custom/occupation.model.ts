import { UserForOccupationModel } from './user-for-occupation.model';
export class OccupationModel {
    public id : number;
	public name : string;
	public expanded : boolean;
	public children : UserForOccupationModel[];
}