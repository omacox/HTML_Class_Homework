### Notes

1. Note for Homework 9
The github does not have the media files they are too be LOL just grab something but the site is on

<https://omacox.com/hw9>

2. Note for Homework 10

Lesson Outline:

 1. Introduction: Discusses the purpose of image carousels and provides an overview of the technologies used: HTML, CSS, and optionally JavaScript.

 2. HTML Structure: Sets up the basic HTML structure for the carousel, consisting of a container <div> with multiple image items inside it.

    3. CSS Styling: Focuses on styling the carousel to ensure proper layout and visibility, using CSS properties such as display: flex for the items and transition for smooth animations.

    4. JavaScript for Sliding: (Optional) Adds JavaScript to automate the sliding of images. This involves using a timer (setInterval) to cycle through images and applying/removing the active class to manage which image is visible.

    5. Customization: Encourages students to further enhance the carousel with features like navigation arrows, pagination dots, or touch swipe functionality.

    6. Assignment: Students are tasked with creating their own customized image carousel and integrating it into a sample web page.

Additional Git

 1046  git status
 1047  git add .
 1048  git commit -m "Homework 10"
 1049  git push origin main

    ssh-keygen -t ed25519 -C "your_email@example.com"
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519
    cat ~/.ssh/id_ed25519.pub

    - Go to GitHub > Settings > SSH and GPG keys > New SSH key.
    - Paste your SSH key and save it.

    git clone git@github.com:username/repo.git
    cd <repo directory>
    git status
    git add .
    or 
    git add <file-name>
    git commit -m "Your commit message"
    git status
    git push origin main
    or 
    git push origin <your-branch-name>

ssh-keygen -t ed25519 -C "<your_email@example.com>"

keys stored: `/home/username/.ssh/id_ed25519`

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub

Copy the displayed key to your clipboard.
Go to GitHub and log in.
Navigate to: `Settings > SSH and GPG keys > New SSH key`.
Paste the copied key into the key field, give it a descriptive title, and click `Add SSH key`.

Configure Git to Use SSH
Edit or create a Git configuration file to ensure Git uses SSH instead of HTTPS for your repositories.

git config --global user.name "Your Name"
git config --global user.email "<your_email@example.com>"

git remote set-url origin <git@github.com>:username/repository.git

ssh -T <git@github.com>

Grab from Github
git clone <git@github.com>:username/repository.git
cd repository
git add .
git commit -m "Your commit message"
git status
git push origin main

 Summary

1. Generate SSH Key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add Key to SSH Agent: `ssh-add ~/.ssh/id_ed25519`
3. Add SSH Key to GitHub: Copy the key from `cat ~/.ssh/id_ed25519.pub` and add it to GitHub.
4. Configure Git: Ensure Git uses SSH URLs.
5. Test Connection: `ssh -T git@github.com`
6. Use SSH for Git Operations: Clone, push, and pull using SSH.

Create Local and push to github
mkdir my-project
cd my-project
git init
touch README.md
git add .
git commit -m "Initial commit"

Go to GitHub and create a new repository.
 • Do not initialize the repository with a README, .gitignore, or license file
        if you plan to push an existing project (since you’ve already done this locally)

git remote add origin <https://github.com/yourusername/my-project.git>

git push -u origin main

Then go to github and check the respository
