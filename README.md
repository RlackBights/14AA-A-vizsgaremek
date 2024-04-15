# LearnTheBasics

LearnTheBasics is an educational game project made to teach beginners the basics of website development

## Installation

The game installer can be found on the [project's website](https://bgs.jedlik.eu/learnthebasics)

If you'd like to run it on your local machine from the source code, follow these steps:

### 1. Clone the project
```bash
git clone https://github.com/RlackBights/14AA-A-vizsgaremek
```
### 2. Open the project folder
```bash
cd ./14AA-A-vizsgaremek
```
### 3. Install Node modules
```PowerShell
npm i
```
### 4. Run the project using electron
```PowerShell
npm run electron
```

## If you'd like to create your own installer from the source

### 0. Follow the steps from the installation section
Launching the game isn't required, but a good way to see if everything's working
### 1. Pack the project
```PowerShell
npm run pack
```
### 2. Get Inno Setup
This is an installer creator program. We decided to use this for our game's installer. Download and install Inno Setup from [their site](https://jrsoftware.org/isdl.php), and configure everything as you see fit
### 3. Generate the installer
Run `Installer Script.iss` to compile and generate the installer. Additionally, you can edit the options inside the script to customise it ([Inno Setup Documentation](https://jrsoftware.org/ishelp/)) \
The installer will be generated next to the installer generator script, named `LearnTheBasics_Installer.exe`

### Important note: The installer has to be launched with admin privileges, because it has to generate game-related files

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change

## License

[MIT](https://choosealicense.com/licenses/mit/)