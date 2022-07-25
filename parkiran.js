//kumpulan class
class Car{
    constructor(nopol, owner){
        this.nopol = nopol;
        this.owner = owner;
    }
}

class ParkingLot{
    constructor(capacity){
        console.log(`Parkiran kapasitas ${capacity} mobil sedang dibangun` )
        setTimeout(()=>{
            this.carDB = [];
            this.capacity = capacity;
            this.space = capacity;
            console.log('Parkiran Jadi');
        }, 5000)
    }

    park(nopol, owner) {
        if (this.space == 0) {
            return 'penuh';
        } else {
            if (this.carDB.length == 0) {
                const newCar = new Car(nopol, owner);
                this.carDB.push(newCar);
                this.space -= 1;
                return 'done';
            } else {
                for (let i = 0; i < this.carDB.length; i++){
                    if (nopol === this.carDB[i].nopol) {
                        return 'sama';
                    }
                    if (i == this.carDB.length - 1) {
                        const newCar = new Car(nopol, owner);
                        this.carDB.push(newCar);
                        this.space -= 1;
                        return 'done';
                    }

                }
            }

        }

    }

    leave(nopol) {
        if (this.carDB.length != 0){
            let i = 0;
            for (i; i < this.carDB.length; i++){
                if (nopol === this.carDB[i].nopol) {
                    this.carDB.splice(i,1);
                    this.space += 1;
                    return 'done';
                } 
                if (i == this.carDB.length - 1) {
                    return 'gagal';
                }
            }
        } else {
            return 'empty';
        }



    }

    check() {
        let dataCar = []
        for (let i = 0; i < this.carDB.length; i++){
            dataCar.push(this.carDB[i].nopol);
        }
        return `{ capacity : ${this.capacity}, remaining: ${this.space}, parkedCars: ${dataCar}}`;
    }
}

//kumpulan func async
prosesBangunParkir = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
}

waitProsesBangunParkir = async () => {
    try{
        await prosesBangunParkir();
    } catch (error) {
        console.log(error)
    }
}

prosesParkir = (nopol, owner, kelas) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          let result = kelas.park(nopol, owner);
          if (result == 'penuh') {
            reject('Mohon maaf parkiran sudah penuh');
          } else if (result == 'sama') {
            reject(`Mobil ${owner} dengan nopol ${nopol} sudah parkir sebelumnya`);
          } else if (result == 'done') {
            resolve(`Mobil ${owner} dengan nopol ${nopol} berhasil parkir`)
          }
        }, 3000);
      });
}

waitProsesParkir = async (nopol, owner, kelas) => {
    try{
        await waitProsesBangunParkir();
        const result = await prosesParkir(nopol, owner, kelas);
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

prosesCheck = (kelas) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          let result = kelas.check();
            resolve(result)
        }, 500);
      });
}

waitProsesCheck = async (kelas) => {
    try{
        await waitProsesBangunParkir();
        const result = await prosesCheck(kelas);
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

prosesKeluar = (nopol, kelas) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          let result = kelas.leave(nopol);
          if (result == 'empty') {
            reject('Parkiran Kosong');
          } else if (result == 'gagal') {
            reject(`Mobil dengan nopol ${nopol} tidak ada`);
          } else if (result == 'done') {
            resolve(`Mobil dengan nopol ${nopol} sudah keluar`)
          }
        }, 3000);
      });
}

waitProsesKeluar= async (nopol, kelas) => {
    try{
        await waitProsesBangunParkir();
        const result = await prosesKeluar(nopol, kelas);
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}





//main code
const parkService = new ParkingLot(3);
waitProsesBangunParkir();
waitProsesParkir('B001AA', 'Beni', parkService)
waitProsesParkir('B001BA', 'Doni', parkService)
waitProsesParkir('B001BB', 'Jeri', parkService)

//NB: Await saya tidak jalan, jadi saya ngecek output dengan timeout

setTimeout(()=>{
    console.log(parkService.carDB)
    waitProsesCheck(parkService);
}, 10000)

setTimeout(()=>{
    waitProsesKeluar('B001AA', parkService)
    waitProsesKeluar('B001AA', parkService)
}, 12000)

setTimeout(()=>{
    console.log(parkService.carDB)
    waitProsesCheck(parkService);
}, 16000)
