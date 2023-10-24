import js from "./assets/technologies/javascript.svg";
import ts from "./assets/technologies/typescript.svg";
import reactLogo from "./assets/technologies/react.svg";
import nodeJS from "./assets/technologies/node-js.svg";
import express from "./assets/technologies/express.svg";
import java from "./assets/technologies/java.svg"
import postgresql from "./assets/technologies/postgresql.svg";
import mysql from "./assets/technologies/mysql.svg";
import mongodb from "./assets/technologies/mongodb.svg";
import git from "./assets/technologies/git.svg";
import github from "./assets/technologies/github.svg";
import bootstrap from "./assets/technologies/bootstrap.svg";
import tailwind from "./assets/technologies/tailwindcss.svg";
import figma from "./assets/technologies/figma.svg";

export const Skills = () => {
  const techs = [ js, ts, reactLogo, nodeJS, express, java, postgresql, mysql, mongodb, git, github, bootstrap, tailwind, figma]

  return (
    <section className="skill" id="skills">
      
      <div className="skill-bx wow zoomIn">
        <h2>Skills</h2>
        <div className='tech-stack'>
          { techs.map((element) => {
              return (
                <div key={element}> 
                  <img src={element} alt="" />
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
