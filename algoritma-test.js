// Question ALGORITMA Number 1

const word = "NEGIE1";

const wordReverse = (str) => {
    const char = str.split("");

    const getchart1 = char.pop();

    return char.reverse().join("") + getchart1;
};

console.log(wordReverse(word));

// Question ALGORITMA Number 1 END



// Question ALGORITMA Number 2

const sentence = "Saya sangat senang mengerjakan soal algoritma"

const longestWord = (str) => {
    const word = str.split(" ");
    let longest = "";

    for (let i = 0; i < word.length; i++) {
        if (word[i].length > longest.length) {
            longest = word[i];
        } 

    }

    return longest;
}

console.log(longestWord(sentence));

// Question ALGORITMA Number 2 End


// Question ALGORITMA Number 3
const INPUT = ['xc', 'dz', 'bbb', 'dz']  
const QUERY = ['bbb', 'ac', 'dz']  

const countWordOccurrences = (words, queries) => {
    return queries.map(query => words.filter(word => word === query).length);
};

console.log(countWordOccurrences(INPUT, QUERY)); 


// Question ALGORITMA Number 3 End


// Question ALGORITMA Number 4

const Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

const diagonalSum = (matrix) => {
    let firstDiagonal = 0;
    let secondDiagonal = 0;

    for (let i = 0; i < matrix.length; i++) {
        firstDiagonal += matrix[i][i];
        secondDiagonal += matrix[i][matrix.length - i - 1];
    }

    return {
        firstDiagonal,
        secondDiagonal
    }
}

const { firstDiagonal, secondDiagonal } = diagonalSum(Matrix);
const reductionDiagonal = firstDiagonal - secondDiagonal;

console.log(diagonalSum(Matrix));
console.log(reductionDiagonal);

// Question ALGORITMA Number 4 End