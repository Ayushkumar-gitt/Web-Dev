import React from 'react'
import MacWindow from './MacWindow'
import TerminalModule from 'react-console-emulator'
import './note.scss'
const commands = (() => {
    const portfolio = {
        name: 'Ayush Kumar',
        title: 'Frontend Developer',
        location: 'Bihar,India',
        email: 'raj309457@gmail.com'
    }

    const cmds = {
        about: {
            description: 'Quick intro about this portfolio.',
            usage: 'about',
            fn: () => [
                `${portfolio.name} — ${portfolio.title}`,
                `Location: ${portfolio.location}`,
                "Web Developer (Fresher) with strong foundations in Data Structures and Algorithms using Java. Skilled in building full - stack web applications using modern JavaScript frameworks, REST APIs, and databases.Currently learning Generative AI, backend systems, and scalable web architectures.",
                "Type 'projects' to see sample work."
            ].join('\n')
        },
        projects: {
            description: 'List some sample projects (dummy).',
            usage: 'projects',
            fn: () => [
                'Projects:',
                '- MacOS Portfolio UI (this site)',
                '- Perplexity AI',
                '- Snitch E-commerce Website',
                '- Productivity Dashboard',
                "Tip: open the GitHub window for real repos."
            ].join('\n')
        },
        skills: {
            description: 'Show a skills snapshot.',
            usage: 'skills',
            fn: () => [
                'Skills:',
                '- HTML, CSS (SCSS), JavaScript',
                '- React.js, Node.js',
                '- Responsive UI, Animations',
                '- Git/GitHub'
            ].join('\n')
        },
        contact: {
            description: 'How to reach me (dummy).',
            usage: 'contact',
            fn: () => [
                'Contact:',
                `- Email: ${portfolio.email}`,
                // "- Preferred: Email with subject 'Portfolio'"
            ].join('\n')
        },
        date: {
            description: 'Print the current date/time.',
            usage: 'date',
            fn: () => new Date().toString()
        },
        echo: {
            description: 'Echo a passed string.',
            usage: 'echo <string>',
            fn: (...args) => args.join(' ')
        }
    }
    return cmds
})()

const Terminal = TerminalModule?.default?.default ?? TerminalModule?.default ?? TerminalModule

const availableCommandsForWelcome = ['help', 'clear', ...Object.keys(commands)]

const welcomeMessage = [
    "Welcome to the portfolio terminal!",
    '',
    'Available commands:',
    availableCommandsForWelcome
        .sort()
        .map((name) => `- ${name}`)
        .join('\n'),
    "\nTip: type 'help' to list commands."
].join('\n')

const TerminalWindow = ({ windowName, setWindowState }) => {
    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState}>
            <div className="terminal-window">
                <Terminal commands={commands}
                    welcomeMessage={welcomeMessage}
                    promptLabel={'Ayushkumar:~$'} />
            </div>
        </MacWindow>
    )
}

export default TerminalWindow
