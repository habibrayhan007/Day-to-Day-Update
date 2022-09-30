const names =[
    {name:"Habib", job: "student", born: 1997, homeTown: "Pabna"},
    {name:"Rayhan", job: "student", born: 1998, homeTown: "Pabna Sador"},
    {name:"Zibon", job: "engineer", born: 1990, homeTown: "Dhaka"},
    {name:"Hridoy", job: "Developer", born: 1997, homeTown: "Dhaka"},
    {name:"Bappy", job: "engineer", born: 1995, homeTown: "Natore"},
    {name:"Rahim", job: "student", born: 1997, homeTown: "uttara"},
];

const age = [
    45, 24, 23, 19, 27, 30, 18, 15, 45, 14, 62, 33
];

//foreach
names.forEach((name) => {
    console.log(name.name);
});

//filter
const canDrink = age.filter(age => age>= 18);
console.log(canDrink);

const jobs = names.filter(job => job.job === "student");
console.log(jobs);

const bornYear96To99 = names.filter(year => (year.born>=1996 && year.born < 2000));
console.log(bornYear96To99);


//mapping
const hometowns = names.map((homeTown) => {
    return homeTown.homeTown;
});
console.log(hometowns);

const agesSquare = age.map( age => Math.sqrt(age));
console.log(agesSquare);

//sort
const sortAges = age.sort();
console.log(sortAges);

//reduce
let ageSum = 0;

for(i=0; i<age.length; i++){
    ageSum += age[i];
}
console.log(ageSum);

const ageSumReduce = age.reduce((total, age) => {
    return total + age;
}, 0);

console.log(ageSumReduce);