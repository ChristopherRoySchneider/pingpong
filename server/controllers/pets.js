var mongoose = require('mongoose')
var Pet = mongoose.model('Pet') // We are retrieving this Schema from our Models, named 'tenrec'

module.exports = {
    find_all: function (req, res) {
        Pet.find({}, function (err, pet) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                // console.log('got all pets:', pet);
                res.json({ message: "Success", data: pet })
            }
        }).sort('-_id')
    },
    new: function (req, res) {
        // console.log(req)
        var newPet = new Pet();
        newPet.name = req.body.name;
        newPet.description = req.body.description;
        newPet.type = req.body.type;
        newPet.skill1 = req.body.skill1;
        newPet.skill2 = req.body.skill2;
        newPet.skill3 = req.body.skill3;
        newPet.likes = 0
        
        newPet.save(function (err) {
            if (err) {
                console.log('error saving new user: ',err);
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('new pet:', newPet);
                res.json({ message: "Success", data: newPet })
            }
            
        })
    },
    get_by_id: function (req, res) {
        Pet.find({_id:req.params.petid}, function (err, p_by_name) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('got pets by name:', p_by_name);
                res.json({ message: "Success", data: p_by_name })
            }
        })
    },
    edit: function (req, res) {
        // console.log("POST DATA", req.body);
        Pet.findOne({ _id: req.params.petid }, function (err, pet) {
            pet.name = req.body.name;
            pet.description = req.body.description;
            pet.type = req.body.type;
            pet.skill1 = req.body.skill1;
            pet.skill2 = req.body.skill2;
            pet.skill3 = req.body.skill3;
            
          
            
            pet.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    res.json({ message: "Error", error: err })
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully added a pet!');
                    res.json({ message: "Success",  })
                }
            })
        })
    },


    remove: function (req, res) {
        Pet.deleteOne({_id:req.params.petid}, function (err) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('!!!!!!!!!!!!!!!deleted pet by id:',req.params.petid );
                res.json({ message: "Success" })
            }
        })
    },

    like: function (req, res) {
        // console.log("POST DATA", req.body);
        Pet.findOne({ _id: req.params.petid }, function (err, pet) {
            pet.likes +=1
            
          
            
            pet.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    res.json({ message: "Error", error: err })
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully liked a pet!');
                    res.json({ message: "Success",  })
                }
            })
        })
    },
    


}