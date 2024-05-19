interface calculateExercisesvalues {
    dailyHours: number[];
    target: number;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

const calculateExercisesparseargs = (args: string[]): calculateExercisesvalues => {
    if (args.length < 4) {
        throw new Error(`Invalid number (${args.length - 2}) of arguments (required arguments: target, ...hours)`);
    }
    if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
        return {
            dailyHours: args.slice(3).map(arg => Number(arg)),
            target: Number(args[2])
        };
    } else {
        throw new Error("Arguments were not numbers");
    }
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h !== 0).length;
    const average = dailyHours.reduce((a, b) => a + b) / periodLength;
    const success = target <= average;
    let rating;
    let ratingDescription;
    if (average < (target / 2)) {
        rating = 1;
        ratingDescription = "not enough exercise";
    }
    else if (average < target) {
        rating = 2;
        ratingDescription = "not too bad but could do better";
    }
    else {
        rating = 3;
        ratingDescription = "target amount reached good job";
    }
    return {
        periodLength,
        trainingDays,
        target,
        average,
        success,
        rating,
        ratingDescription
    };
};

try {
    const {dailyHours, target} = calculateExercisesparseargs(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch(er: unknown) {
    if (er instanceof Error) console.log(er.message);
}
