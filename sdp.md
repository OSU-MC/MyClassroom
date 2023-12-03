# Software Development Process (SDP)
## Principles
### Responsive Communication:
Team members agree to respond to all communications within 24 hours to maintain a steady flow of information and address queries or concerns promptly.

### Continuous Workflow:
Utilizing a Kanban board (GitHub Projects), the team commits to maintaining a backlog that is consistently populated with at least two weeks’ worth of work items ready to be tackled.

### Detailed Work Items:
Before any work begins on a task, it must be accompanied by a comprehensive description, including a user story or motivation, technical specifications, any dependencies, an estimate of the time required, and clear acceptance criteria.

### Branching Strategy:
All code changes, regardless of their size or significance, should be developed in a separate git branch to maintain code integrity and facilitate easier code reviews.

### Code Review and Quality:
Pull Requests (PRs) are mandatory for every task completion, requiring at least one peer review to ensure code quality, and adherence to standards before any merging into the main branch occurs. Reviews should be completed within 48 hours.

### Definition of Done:
Every PR must comply with a predefined "Definition of Done" checklist, ensuring all necessary steps, including testing and documentation, have been completed satisfactorily.

### Work Item Sizing:
Tasks should be sized such that they can be completed within one day, encapsulating a meaningful and manageable amount of work. If a work item is too large, it needs to be broken down into smaller, more manageable pieces.

### Collaborative Problem Solving:
The team commits to a collaborative approach for problem-solving, encouraging open discussions and brainstorming sessions to tackle challenges and find optimal solutions collectively.

## Process
Given the part-time and asynchronous nature of our team, we have opted for a blend of Agile, Kanban, and DevOps practices to guide our software development process. This hybrid approach is tailored to accommodate our varying schedules while ensuring steady progress and maintaining high-quality standards.

### Backlog and Planning (Weekly):
- At the beginning of each week, we conduct a backlog session to prioritize and refine work items. This ensures that the backlog remains relevant, well-prioritized, and populated with ready-to-pick tasks.
- Discuss process failures and workflow improvements to avoid similar issues in the future
- Each work item in the backlog is accompanied by a clear description, acceptance criteria, and an estimated time for completion.
- Team members volunteer for tasks based on their availability and expertise, fostering a sense of ownership and responsibility.

### Kanban Board:
- Our workflow is visualized on a Kanban board, with columns for “To Do,” “In Progress,” “In Review,” and “Done.”
- Work items are pulled from the “To Do” column and moved to “In Progress” when work begins.
- To maintain transparency and avoid bottlenecks, work-in-progress (WIP) limits are set for each column.

### Code Development and Branching:
- All code changes are made in separate branches, adhering to our predefined branching strategy.
- Continuous integration tools are in place to ensure that every code push is automatically tested, helping to catch issues early.

### Documentation:
- Include clear, inline documentation for complex code sections and key decisions.
- Review code documentation for completeness and clarity during the PR process.
- Update README and Wiki documentation before releases to reflect code changes and project evolution.

### Code Review and Quality Assurance:
- Upon completion of a task, a Pull Request (PR) is created for code review.
- At least one peer review is required to ensure code quality, adherence to standards, and alignment with the project’s goals.
- Automated code quality checks are integrated into the PR process.

### Demo/Review with Stakeholders (Biweekly):
- Every other week, we hold a demo/review session with stakeholders to showcase the progress made, gather feedback, and adjust our plans accordingly.
- This session also serves as an opportunity for the team to reflect on the week, celebrate achievements, and discuss any challenges faced.

By following this process, we aim to strike a balance between structure and flexibility, ensuring that we can adapt to change while maintaining a steady pace of high-quality work.

## Roles
### Project Manager:
- Overseeing project timelines, coordinating meetings, and keeping team on track from group submissions
- (Rotate weekly)

### Backlog Manager:
- Coordinating the backlog and tasks for that particular week
- Karin Ocheretny

### Frontend Developer and Quality Assurance:
- Handling client-side development, ensuring a seamless user experience, and conducting software quality assurance.
- Nils Streedain, Elijah Durban

### Backend Developer:
- Handling server-side development, ensuring robust database accessibility and API stability for front end team
- Justin Fernbaugh, Karin Ocheretny

## Tooling
Version Control | Project Management | Documentation | Test Framework | Linting and Formatting | CI/CD | IDE | Graphic Design
---|---|---|---|---|---|---|---
GitHub | GitHub Issues and Projects | README.md File in addition to Github Wiki | Jest | Prettier | GitHub Actions | Visual Studio Code | Figma or Google Slides/Drawings

## Definition of Done (DoD)
### Code and Documentation:
Changes have been reviewed, approved, and merged to the main branch. Relevant documentation and release notes are updated.

### Testing:
Unit and integration tests pass without issues. No regressions are identified.

### Comprehensive Implementation:
All relevant components (e.g., backend, frontend) reflect the changes.

### Deployment and Validation:
Changes are deployed to staging and validated in a real-world setting.

### Stakeholder Engagement:
A demo is prepared, and any breaking changes are communicated to stakeholders.

### Quality and Security:
Code analysis confirms quality, and security checks ensure no vulnerabilities.

### Performance and Feedback:
Changes do not degrade performance, and any user feedback, if part of the process, has been addressed.

## Release Cycle
### Continuous Integration and Staging Deployment:
#### Automated Deployment to Staging:
Upon every merge to the main branch, changes are automatically deployed to the staging environment. This ensures immediate testing of new features or fixes in a real-world setting.

### Production Deployment and Release Schedule:
#### Scheduled Production Releases:
We aim to deploy to production every three months. This cadence allows us sufficient time for feature development, bug fixes, and thorough testing.

#### Semantic Versioning:
We adopt the MAJOR.minor.patch versioning format. 
- **Major Version Increment:** For breaking changes, particularly API changes. The major version will remain at 0 until we achieve a stable API.
- **Minor Version Increment:** For new features and enhancements.
- **Patch Version Increment:** For bug fixes and minor improvements.

### Quality Assurance and Testing:
#### Pre-Release Testing:
Before each production release, we conduct a thorough testing phase in the staging environment to ensure all new features and fixes work as expected.

### Feedback and Iteration:
#### Post-Release Monitoring:
After a production release, we closely monitor the application for any unexpected behavior and are prepared to roll back if necessary.

#### Iterative Improvement:
Feedback gathered post-release is crucial for the continuous improvement of the application, influencing the priorities and tasks for the next development cycle.

## Environments
Environment | Infrastructure | Deployment | What is it for? | Monitoring
---|---|---|---|---
Production | Private AWS through CI/CD | Release | Field testing of the production version. Users would deploy their own instance. | Prometheus
Staging (Test) | Private AWS through CI/CD | PR | New unreleased features and integration/unit tests | N/A
Dev | Local (macOS and Windows) | Commit | Development and unit tests | N/A
