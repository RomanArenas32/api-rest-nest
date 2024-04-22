import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {

    private _user: UserDto[];
    constructor(){
        this._user = [];
    }

    createUser(user: UserDto){
        console.log("first")
        const userFound = this._user.find(u => u.id === user.id);
        if(!userFound){
            this._user.push(user);
            console.log(user);
            return true
        }
        return false

    }
    updateUser(user: UserDto){
            const findUser = this.createUser(user);
            //Si el usuario no es encontrado se creara, caso contrario se actualizará en las lineas de abajo
            if(!findUser){
                const index = this._user.findIndex(u => u.id === user.id);
                this._user[index] = user;
            }
            return true;  
    }

    deleteUser(idUser: number){
        const index = this._user.findIndex(u => u.id == idUser);
        if(index != -1){
            this._user.splice(index, 1);
            return true;
        }
        return false
    }

    getUsers(start: Date, end: Date){
        if(start && end){
            return this._user.filter(u => u.birthDate.getTime() >= start.getTime() && u.birthDate.getTime() <= end.getTime())
        }
        else if(start && !end){
            return this._user.filter(u => u.birthDate.getTime() >= start.getTime())
        }
        else if(!start && end){
            return this._user.filter(u => u.birthDate.getTime() <= end.getTime())
        }
        else{
            return this._user;
        }
    }
}
