export class  Building{
    public shortname:string;
    public fullname: string;
    public address: string;
    public rooms: Array<Room>;
    public has_rooms: boolean;

    constructor (){
        this.shortname = null;
        this.fullname = null;
        this.address = null;
        this.rooms = [];
        this.has_rooms = false;

    }

    addRoom(room: Room){
        this.rooms.push(room);
        if(!this.has_rooms){
            this.has_rooms = true;
        }
    }

}


export class Room{
    public room_number: string;
    public room_name: string;
    public room_seats: number;
    public room_type: string;
    public room_furniture: string;
    public room_href: string;

    constructor(){
        this.room_number = null;
        this.room_name = null;
        this.room_seats = null;
        this.room_type = null;
        this.room_furniture = null;
        this.room_href = null;
    }
}