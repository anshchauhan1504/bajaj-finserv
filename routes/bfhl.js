const express = require('express');
const router = express.Router();

function containsOnlyNumbers(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}

function containsOnlyAlphabets(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function findHighestCharacter(arr) {
    return arr.map(char => char.toLowerCase()).sort().pop();
}

router.get('/', (req, res)=> {
    res.status(200).json({"operation_code": 1})
})

router.post('/', (req, res)=> {
    // Request should contain
    // If an alphabet is present in the input, it will always be a single character, never a word. And “highest_alphabet” refers to the alphabet from the input array which occurs last in the A-Z series (case insensitive).
    // {"data": [“M”,”1”,”334”,”4”,”B”]}


    // Character should be 1 letter


    const data = req.body.data;
    if (!data) {
        return res.status(404).send("Request is invalid")
    }
    if (!Array.isArray(data)) {
        return res.status(404).send("Request is invalid")
    }
    if (data.length <= 0) {
        return res.status(404).send("Request is invalid")
    }
    data.forEach((item)=>{
        if (!(typeof item === 'string' || item instanceof String)) {
            return res.status(404).send("Request is invalid")
        }
    })
    let numbers = []
    let alphabets = []
    
    data.forEach((item)=>{
        if (containsOnlyNumbers(item)) {
            numbers.push(item)
        } else {
            if (containsOnlyAlphabets(item)) {
                if (item.length == 1) {
                    
                    alphabets.push(item)
                } else {
                    return res.status(404).send("Request is invalid")    
                }
            }
            else {
                return res.status(404).send("Request is invalid")
            }
        }
    })
    let highest_alphabet = []
    if (alphabets.length > 0) {
        highest_alphabet = [findHighestCharacter(alphabets)]
    }


    res.json({
        "is_success": "true",
        "user_id": "ansh_chauhan_15042002",
        "email": "ansh.chauhan2020@vitbhopal.ac.in",
        "roll_number": "20BCE11016",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    })
    // Response should contain
    // 1. Status
    // 2. User ID
    // 3. College Email ID
    // 4. College Roll Number
    // 5. Array for numbers
    // 6. Array for alphabets
    // 7. Highest Alphabet in the input array of alphabets [Refer to note in Annexure for more info]
})

module.exports = router