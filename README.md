*This repository contains the Bootstrap subtheme for https://rootstalk.grinnell.edu.*  
This theme is housed in DGDevX.grinnell.edu:/var/www/html/drupal/web/sites/default/themes/bootstrap_rootstalk. 

Note that on March 1, 2018, it was necessary to MANUALLY apply the corrections mentioned in https://www.drupal.org/project/bootstrap/issues/2903656 to this sub-theme in order to make JS drop-down menus work again.

The very latest Apple Note describing how the local Rootstalk copy was built...

## Latest (Working) Docker4Drupal Configuration Script for Rootstalk Local Build

DGDEVX-TERM:  
	dguser@dgdevx:/var/www/html/drupal$ rsync -aruvi . markmcfate@132.161.249.252:/Users/markmcfate/Projects/Docker/.resources/copy_of_Rootstalk_from_DGDevX/  
	dguser@dgdevx:/var/www/html/drupal/web/sites/default$ drush cr all  
	dguser@dgdevx:/var/www/html/drupal/web/sites/default$ drush sql-dump > rootstalk.sql  
 	dguser@dgdevx:/var/www/html/drupal/web/sites/default$ rsync -aruvi rootstalk.sql  markmcfate@132.161.249.252:/Users/markmcfate/Projects/Docker/.resources  

LOCAL-TERM:  
	cd ~/Projects/Docker/;  
	rootstalk/docker-compose down;  
	rm -fr rootstalk;  
	mkdir rootstalk;  
	# …the next step takes a couple of minutes  
	cp -fr .resources/copy_of_Rootstalk_from_DGDevX/* rootstalk/;  
	chown -R markmcfate:staff rootstalk/;  
	mkdir rootstalk/mariadb-init;  
	cp -f .resources/rootstalk.sql rootstalk/mariadb-init/rootstalk.sql;  
	cp -f .resources/settings.php rootstalk/web/sites/default/settings.php  
	rm -fr docker4drupal;  
	git clone https://github.com/DigitalGrinnell/docker4drupal.git -b option2;  
	cp -f docker4drupal/docker-compose.yml rootstalk/.;  
	cd rootstalk;  
	docker-compose up -d;  
	# …odd that below is sometimes required more than once (race condition?), but it works!  
	docker-compose up -d;  

DGDEVX-TERM:  
	cd /var/www/html/drupal  
	sudo composer require drupal/collapse_text  
	sudo composer require ircmaxell/password-compat  
	sudo composer require phpdocumentor/reflection-common  
	sudo composer require squizlabs/php_codesniffer  
	sudo composer require wikimedia/composer-merge-plugin  

FIREFOX:  
	visit http://drupal.docker.localhost:8000  —> Works!  
	visit http://portainer.drupal.docker.localhost:8000 —> Works as expected!  

		*The marked packages listed under ATOM: above were removed but NOT re-installed!

<!-- @file Instructions for subtheming using the Less Starterkit. -->
<!-- @defgroup sub_theming_less -->
<!-- @ingroup sub_theming -->
# Less Starterkit

Below are instructions on how to create a Bootstrap sub-theme using a Less
preprocessor.

- [Prerequisites](#prerequisites)
- [Additional Setup](#setup)
- [Overrides](#overrides)

## Prerequisites
- Read the @link getting_started Getting Started @endlink and @link sub_theming Sub-theming @endlink documentation topics.
- You must understand the basic concept of using the [Less] CSS pre-processor.
- You must use a **[local Less compiler](https://www.google.com/search?q=less+compiler)**.
- You must use the [Bootstrap Framework Source Files] ending in the `.less`
  extension, not files ending in `.css`.

## Additional Setup {#setup}
Download and extract the **latest** 3.x.x version of
[Bootstrap Framework Source Files] into the root of your new sub-theme. After
it has been extracted, the directory should be renamed (if needed) so it reads
`./THEMENAME/bootstrap`.

If for whatever reason you have an additional `bootstrap` directory wrapping the
first `bootstrap` directory (e.g. `./THEMENAME/bootstrap/bootstrap`), remove the
wrapping `bootstrap` directory. You will only ever need to touch these files if
or when you upgrade your version of the [Bootstrap Framework].

{.alert.alert-warning} **WARNING:** Do not modify the files inside of
`./THEMENAME/bootstrap` directly. Doing so may cause issues when upgrading the
[Bootstrap Framework] in the future.

## Overrides {#overrides}
The `./THEMENAME/less/variable-overrides.less` file is generally where you will
the majority of your time overriding the variables provided by the [Bootstrap
Framework].

The `./THEMENAME/less/bootstrap.less` file is nearly an exact copy from the
[Bootstrap Framework Source Files]. The only difference is that it injects the
`variable-overrides.less` file directly after it has imported the [Bootstrap
Framework]'s `variables.less` file. This allows you to easily override variables
without having to constantly keep up with newer or missing variables during an
upgrade.

The `./THEMENAME/less/overrides.less` file contains various Drupal overrides to
properly integrate with the [Bootstrap Framework]. It may contain a few
enhancements, feel free to edit this file as you see fit.

The `./THEMENAME/less/style.less` file is the glue that combines the
[Bootstrap Framework Source Files] and `overrides.less` files together.
Generally, you will not need to modify this file unless you need to add or
remove files to be imported. This is the file that you should compile to
`./THEMENAME/css/styles.css` (note the same file name, using a different
extension of course).

#### See also:
- @link theme_settings Theme Settings @endlink
- @link templates Templates @endlink
- @link plugins Plugin System @endlink

[Bootstrap Framework]: http://getbootstrap.com
[Bootstrap Framework Source Files]: https://github.com/twbs/bootstrap/releases
[Less]: http://lesscss.org
