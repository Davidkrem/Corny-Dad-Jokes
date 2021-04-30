const jokeButton = document.querySelector('.getJoke');
const jokeHolder = document.querySelector('.joke p');
const loader = document.querySelector('.loader');

function wait(ms = 0) {
        return new Promise((resolve) => setTimeout(resolve, ms));
}

const buttonText = [
        'Gross Dad!.',
        '🤦🏻‍♂️',
        'OMG dad...',
        'you are the worst',
        'seriously...',
        'stop it!',
        'please stop',
        'that was like literally like the WORST one!',
        'Go play shuffleboard, DAD!',
        'Go eat your early bird dinner, DAD!',
];

async function fetchJoke() {
        // turn loader on
        loader.classList.remove('hidden');
        jokeButton.classList.add('hidden');
        await wait(400);
        const response = await fetch('https://icanhazdadjoke.com', {
                headers: {
                        Accept: 'application/json',
                },
        });
        const data = await response.json();
        // turn loader off
        loader.classList.add('hidden');
        jokeButton.classList.remove('hidden');
        return data;
}

function randomItemFromArray(arr, not) {
        const item = arr[Math.floor(Math.random() * arr.length)];
        // recursion
        if (item === not) {
                console.log('AHH We already used that last time, look again!');
                return randomItemFromArray(arr, not);
        }
        return item;
}

async function handleClick() {
        const { joke } = await fetchJoke();
        console.log(joke);
        jokeHolder.textContent = joke;
        jokeButton.textContent = randomItemFromArray(buttonText, jokeButton.textContent);
}

jokeButton.addEventListener('click', handleClick);
