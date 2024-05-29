interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescrition extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescrition {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescrition {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescrition {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface PartProps {
  coursePart: CoursePart;
}

interface TotalProps {
  courseParts: CoursePart[];
}

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.courseName}</h1>
  );
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(part =>
        <Part key={part.name} coursePart={part} />
      )}
    </div>
  );
}

const Part = (props: PartProps) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.coursePart.kind) {
    case "basic":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>{props.coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>{`Number of group projects ${props.coursePart.groupProjectCount}`}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>{props.coursePart.description}</p>
          <p>{`Backdround material: ${props.coursePart.backgroundMaterial}`}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>{props.coursePart.description}</p>
          <p>{`Requirements: ${props.coursePart.requirements.join(", ")}`}</p>
        </div>
      );
    default:
      return assertNever(props.coursePart);
  }
}

const Total = (props: TotalProps) => {
  const totalExercises = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;