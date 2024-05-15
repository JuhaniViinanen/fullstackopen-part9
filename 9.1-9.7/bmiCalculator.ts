interface calculateBMIvalues {
    height: number;
    weight: number;
}

const calculateBMIparseargs = (args: string[]): calculateBMIvalues => {
    if (args.length !== 4) {
        throw new Error(`Invalid number (${args.length - 2}) of arguments (required arguments: height, weight)`);
    }
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error("Arguments were not numbers");
    }
}

const calculateBMI = (height: number, weight: number): string => {
    const bmi = weight / ( (height/100) ** 2)
    if (bmi < 16) return "Underweight (Severe)"
    if (bmi < 17) return "Underweight (Moderate)"
    if (bmi < 18.5) return "Underweight (Mild)"
    if (bmi < 25) return "Normal (healthy weight)"
    if (bmi < 30) return "Overweight (Pre-obese)"
    if (bmi < 35) return "Obese (Class 1)"
    if (bmi < 40) return "Obese (Class 2)"
    return "Obese (Class 3)"
}

try {
    const {height, weight} = calculateBMIparseargs(process.argv);
    console.log(calculateBMI(height, weight));
} catch (er: unknown) {
    if (er instanceof Error) console.log(er.message);
}
