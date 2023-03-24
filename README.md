### Build

```bash
npm install -g @ionic/cli
```


#### Android:
```bash
ionic capacitor build android
```


#### ios:

```bash
sudo gem install cocoapods
```

> If you are getting an error while installing cocoapods
> ERROR:  Error installing cocoapods:
	The last version of activesupport (>= 5.0, < 8) to support your Ruby & RubyGems was 6.1.7.3. Try installing it with `gem install activesupport -v 6.1.7.3` and then running the current command again
	activesupport requires Ruby version >= 2.7.0. The current ruby version is 2.6.10.210.
> Install gem install activesupport -v 6.1.7.3 (as mentioned in the error above) and reinstall cocoapods again using same command.

```bash
cd ios/App
pod install
```

```
npm run build:ios
```
