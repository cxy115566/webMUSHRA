## Podagent Project
This project is based on [webMUSHRA](https://github.com/audiolabs/webMUSHRA/releases/latest) and has been modified to meet specific requirements. Thanks to the original author for their contribution!

- **Original Author**: [AudioLabs 2020](https://github.com/audiolabs)
- **Original Project**: [webMUSHRA](https://github.com/audiolabs/webMUSHRA/)
- **Reference Content**: The core architecture and some code implementations of Vue.js were referenced and customized to fit a specific business scenario.

**Specific requirements**: The podagent shows different questions in the same page and add Multiple Selection Question in the submit page


# Podagent
## Supported Browsers

 * Google Chrome on Windows, Mac and Linux
 
## Getting started: Setting up Podagent using PHP's builtin webserver

To load audio files and save the results as csv text files, Podagent needs to run on a web server. If you already have `php` installed on your system (for example on Mac OS X), you can run a php development server on port 8000 from the terminal using `php -S localhost:8000` or `php -S 0.0.0.0:8000`.

Now you can run 

Podagent Survey using the following URL: http://localhost:8000/?config=podagent_survey_random.yaml

Podagent Dialogue using the following URL: http://localhost:8000/?config=podagent.yaml


### Docker

You can use docker to set up Podagent quickly. Just run
`docker-compose -f docker-compose.yml build` to build the Podagent docker container.

To run the container use Podagent `docker-compose -f docker-compose.yml up`. We configured the docker image so that the `configs` and the `results` folder is mounted inside the container so that you can modify it on the fly and receive results within the `results` folder.

#### Note for Docker on Windows

When using Docker Toolbox/Machine on Windows, volume paths (to mount the `configs` and `results` folder) are not converted by default. To enable this conversion set the environment variable COMPOSE_CONVERT_WINDOWS_PATHS=1 e.g. by `env:COMPOSE_CONVERT_WINDOWS_PATHS=1` in the power shell.


#### Change or add a configuration
Podagent uses [YAML](https://en.wikipedia.org/wiki/YAML) to configure experiments. Since YAML is using whitespace indentation (no tab characters!), we recommend to use a text editor like [Atom](http://atom.io) that ships with YAML support.


A simple **podagent questionnaire** test in YAML looks like this:
```yaml
testname: Podcast Audio Evaluation Survey
testId: questionnaire
bufferSize: 2048
stopOnErrors: true
showButtonPreviousPage: true
remoteService: service/write.php #replace it with your backend api

pages: 
    - type: generic
      id: first_page
      name: Welcome to the <span class="highlight">Podcast Audio Evaluation Survey</span>!
      content: welcome description
    - type: likert_single_stimulus
      id: System1
      name: System1
      content:  
      showWaveform: true
      mustRate: true
      randomize: false
      maxStimuli: 2
      stimuli:
          Arts_17: configs/resources/audio/mono_c1.wav #replace it with your test audio
          Arts_19: configs/resources/audio/mono_c2.wav
      response:
        - 
          - value: 
            title: Section 1: Quantitative Analysis (0-10 Scale)
            description: <span class="highlight">0</span> = not met at all, <span class="highlight">5</span> = moderately met, <span class="highlight">10</span> = fully met. Comments are optional but encouraged.
            label: 1. How well does the <span class="highlight">speakers’ voice</span> <span class="underline"> align with the tone and content of the podcast</span>?
            type: rate
            rate: 10
            min_value: not met at all
            mid_value: moderately met
            max_value: fully met
            img: configs/resources/images/star_off.png
            imgSelected: configs/resources/images/star_on.png
            imgHigherResponseSelected: configs/resources/images/star_on.png
        -
          - value: 
            label: 2. How <span class="underline">clearly and effectively</span> do the <span class="highlight">speakers</span> <span class="underline">deliver the podcast content</span>?
                  <p>(Does their delivery make the main ideas easy to understand?)</p>
            type: rate
            rate: 10
            min_value: not met at all
            mid_value: moderately met
            max_value: fully met
            img: configs/resources/images/star_off.png
            imgSelected: configs/resources/images/star_on.png
            imgHigherResponseSelected: configs/resources/images/star_on.png  
        -
          - value: 
            title: Additional Comments (Optional)
            label: 3. Any additional comments on this podcast audio?
            type: option
    - type: finish
      name: Thank you
      content: Thank you for attending!
      showResults: true
      writeResults: true
      questionnaire:
          - type: likert #Single Selection Question
            name: ebackground
            label: Education Background
            response:
               - type: select
                 select_value: Less than high school/High school or equivalent/Bachelor’s degree/Master’s degree/Doctorate or higher
          - type: likert2 #Multiple Selection Question
            name: typePodcasts 
            label: If yes, what types of podcasts do you listen to? (Select all that apply) 
            response:
             - value: Society and Culture
               label: Society and Culture
             - value: Comedy
               label: Comedy    
```

A simple **podagent dialogue** test in YAML looks like this:

```yaml
pages:
  - type: mushra
    id: Item 1
    name: Orchestra
    content: Add additional notes for the participants
    showWaveform: true
    reference: reference.wav #the duration of audios should be smaller than 30s
    createAnchor35: true
    createAnchor70: true
    stimuli:
      C1: codec1.wav # The duration of the audio should be consistent with the reference.
      C2: codec2.wav
      C3: codec3.wav
```


## Citation

If you use webMUSHRA in your publication, please cite it using the following reference:

> Schoeffler, M. et al., (2018). webMUSHRA — A Comprehensive Framework for Web-based Listening Tests. Journal of Open Research Software. 6(1), p.8.

## References

* [Journal of Open Research Software Paper](http://doi.org/10.5334/jors.187)
* [Web Audio Conference 2015 Paper](http://wac.ircam.fr/pdf/wac15_submission_8.pdf)
* [Web Audio Conference 2015 Presentation](http://www.audiolabs-erlangen.de/content/resources/webMUSHRA/slides.html#/)

