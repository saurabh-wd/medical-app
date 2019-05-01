export class Patient {
    id?: number;
    first_name: String;
    last_name: String;
    age: number;
    gender: String;
    address: String;
    phone: String;
    counsulted_by: String;
    complaints: String;
    results?: String;
    drugs?: String;
    checked?:boolean;


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
