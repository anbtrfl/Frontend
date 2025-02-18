function makePotionsRoom() {
    return {
        store: new Map(),

        add: function (shelveName, potion) {
            let potions = this.store.get(shelveName);
            if (potions == null) {
                potions = [];
                this.store.set(shelveName, potions);
            }
            potions.push(potion);
        },
        
        takePotion: function (namePotion) {
            for (let shelve of this.store.keys()) {
                let allPotions = this.getAllPotionsFromShelve(shelve)
                for (let pot of allPotions) {
                    if (pot.name === namePotion) {
                        let psc = pot;
                        this.store.set(shelve, allPotions.filter(item => item !== pot));
                        return psc;
                    }
                }
            }
            return null;
        },

        usePotion: function (namePotion) {
            let potion = this.takePotion(namePotion);
            if (potion) {
                potion.use();
            }
        },

        getAllPotionsFromShelve: function (shelveName) {
            return this.store.get(shelveName);
        },

        getAllPotions: function () {
            let allPotions = [];
            for (let shelve of this.store.keys()) {
                allPotions = allPotions.concat(this.store.get(shelve));
            }
            return allPotions;
        },


        takeAllPotionsFromShelve: function (shelveName) {
            for (let shelve of this.store.keys()) {
                if (shelve === shelveName) {
                    let allPotions = this.store.get(shelve);
                    this.store.set(shelve, []);
                    return allPotions;
                }
            }
        },


        useAllPotionsFromShelve: function (shelveName) {
            for (let shelve of this.store.keys()) {
                if (shelve === shelveName) {
                    let allPotions = this.takeAllPotionsFromShelve(shelve);
                    for (let potion of allPotions) {
                        potion.use();
                    }
                }
            }
        },

        clean: function (revisionDay) {
            let badPotions = [];
            for (let shelve of this.store.keys()) {
                let allPotions = this.store.get(shelve)
                for (let potion of allPotions) {
                    let currentDate = revisionDay.getTime();
                    let expirationDate = new Date(potion.created);
                    expirationDate.setDate(expirationDate.getDate() + potion.expirationDays);
                    if (expirationDate.getTime() < currentDate) {
                        badPotions.push(potion);
                    }
                }
            }

            for (let bPotion of badPotions) {
                for (let shelve of this.store.keys()) {
                    let allPotions = this.store.get(shelve)
                    let newmass = allPotions
                    for (let potion of allPotions) {
                        if (potion === bPotion) {
                            newmass = newmass.filter(item => item !== potion);
                            this.store.set(shelve, newmass);
                        }
                    }
                }
            }
            return badPotions;
        },

        uniquePotionsCount() {
            let set = new Set(this.getAllPotions().map(item => item.name));
            return set.size;
        }
    }
}

module.exports = makePotionsRoom
