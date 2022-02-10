const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ parts }) => (
  <p>
    total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />

    <Content parts={course.parts} />

    <Total parts={course.parts} />
  </div>
);

export default Course;
