import * as inquirer from 'inquirer';

interface IAnswers {
  isCustomerIssue: boolean;
  hasWorkAround: boolean;
  urgency: string;
  impact: string;
  complexity: string;
}

console.log('Hi, welcome to Rubrik Task Priority Calculator');

const URGENCY = [
  'Very Urgent, deadline within this week or so.',
  'Urgent, need it in the coming week.',
  'Not so urgent.'
];

const IMPACT = [
  'Huge impact, very important, huge gains, must have.',
  'Relatively huge impact , ok gains, would still be nice to have.',
  'Not huge impact, minor gains and importance.'
];

const COMPLEXITY = [
  'Less than a few hours of work',
  'Less than a few days of work',
  'At least a week or could be a lot of work.',
];

const questions = [
  {
    type: 'confirm',
    name: 'isCustomerIssue',
    message: 'Is this a customer issue?',
    default: false
  },
  {
    type: 'confirm',
    name: 'hasWorkAround',
    message: 'Do the customers have workaround?',
    default: true,
    when: (answers: IAnswers) => {
      return answers.isCustomerIssue;
    }
  },
  {
    type: 'list',
    message: 'Is this issue urgent?',
    name: 'urgency',
    choices: [
      {
        name: URGENCY[0]
      },
      {
        name: URGENCY[1]
      },
      {
        name: URGENCY[2]
      }
    ]
  },
  {
    type: 'list',
    message: 'Is this issue important?',
    name: 'impact',
    choices: [
      {
        name: IMPACT[0]
      },
      {
        name: IMPACT[1]
      },
      {
        name: IMPACT[2]
      }
    ]
  },
  {
    type: 'list',
    message: 'How much work does this issue require?',
    name: 'complexity',
    choices: [
      {
        name: COMPLEXITY[0]
      },
      {
        name: COMPLEXITY[1]
      },
      {
        name: COMPLEXITY[2]
      }
    ]
  }
];

inquirer.prompt(questions).then((answers: IAnswers) => {
  // Make sure customer issue is at least a P2.
  let score = answers.isCustomerIssue ? 3 : 0;
  if (answers.isCustomerIssue) {
    // Make sure customer issue without workaround is at least a P1.
    score += answers.hasWorkAround ? 0 : 1;
  }

  score += URGENCY.length - URGENCY.indexOf(answers.urgency) - 1;
  score += IMPACT.length - IMPACT.indexOf(answers.impact) - 1;
  score += COMPLEXITY.length - COMPLEXITY.indexOf(answers.complexity) - 1;

  console.log('The task should be assigned:');
  if (score >= 7) {
    console.log(`FREAKING P0 !!!! [score=${score}]`);
  } else if (score >= 4) {
    console.log(`P1 [score=${score}]`);
  } else if (score >= 3) {
    console.log(`P2 [score=${score}]`);
  } else if (score >= 2) {
    console.log(`P3 [score=${score}]`);
  } else {
    console.log(`P4 [score=${score}]`);
  }
});
