import {InMemoryDbService} from 'angular-in-memory-web-api';

export class Students implements InMemoryDbService {
  createDb(){
    let students = [
      {
        id: 1,
        firstName: "Komal",
        lastName: "Kulkarni",
        email: "kk@gmail.com",
        phone: 1234,
        status: "active"
      },
      {
        id: 2,
        firstName: "Chetan",
        lastName: "Pandey",
        email: "cp@gmail.com",
        phone: 5678,
        status: "active"
      }
    ];
    return {
      studentsInDB: students
    }

  }
}
