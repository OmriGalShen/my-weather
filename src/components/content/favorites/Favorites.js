import React from "react";
import "./Favorites.css";

const Favorites = () => {
  return (
    <div className="favorites">
      <div className="favorites-panel shadow-5">
        <h1 className="favorites-title">Favorites</h1>
        <div>
          <p>
            I was first exposed to programming at 8th grade when my friend
            showed me a c++ program he wrote, which seemed very cool to me.
            Together we wrote very simple text games, using tutorials in
            Youtube.
          </p>
          <p>
            In 10th grade, I choose to study computer science and physics. In
            the computer science class, we learned the basics of programming in
            C#. I also made a simple news site using HTML/CSS/JS and C# with
            .NET framework. I also participated in a project called "Computer
            Science, Academia and Industry" by Weizmann Institute of Science, in
            which I made a simple geometric optics simulator (WinForms
            application) using C#.
          </p>
          <p>
            In the middle of my mandatory army service, I decided I miss
            studying and I was motivated to develop myself. To so I started to
            take Computer Science courses at the Open University. I studies
            fully independently using mostly books and some videos at the
            University site.
          </p>
          <p>
            Today I study independently second-year courses but interested in my
            first job in the field. In the meanwhile, I also study using the
            internet Python, React, Node.js and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
