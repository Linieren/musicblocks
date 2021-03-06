﻿// Copyright (c) 2016-2018 Walter Bender
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the The GNU Affero General Public
// License as published by the Free Software Foundation; either
// version 3 of the License, or (at your option) any later version.
//
// You should have received a copy of the GNU Affero General Public
// License along with this library; if not, write to the Free Software
// Foundation, 51 Franklin Street, Suite 500 Boston, MA 02110-1335 USA
//

const NUMBERBLOCKDEFAULT = 4;

const DEFAULTPALETTE = 'rhythm';

const TITLESTRING = _('Music Blocks is a collection of tools for exploring musical concepts.');

// We don't include 'extras' since we want to be able to delete
// plugins from the extras palette.
const BUILTINPALETTES = ['search', 'rhythm',  'meter', 'pitch', 'intervals', 'tone', 'volume', 'drum', 'flow', 'action', 'boxes', 'widgets', 'mouse', 'pen', 'number', 'boolean', 'media', 'sensors', 'heap', 'mice', 'extras'];

const BUILTINPALETTESFORL23N = [_('search'), _('rhythm'), _('meter'), _('pitch'), _('intervals'), _('tone'), _('volume'), _('drum'), _('flow'), _('action'), _('boxes'), _('widgets'), _('mouse'), _('pen'), _('number'), _('boolean'), _('media'), _('sensors'), _('heap'), _('mice'), _('extras')];

// We put the palette buttons into groups.
const MULTIPALETTES = [['rhythm',  'meter', 'pitch', 'intervals', 'tone', 'volume', 'drum', 'widgets'], ['flow', 'action', 'boxes', 'number', 'boolean', 'heap', 'extras'], ['mouse', 'pen', 'media', 'sensors', 'mice']];

// Skip these palettes in beginner mode.
const SKIPPALETTES = ['heap', 'extras'];

// Icons used to select between multipalettes.
const MULTIPALETTEICONS = ['music', 'logic', 'graphics'];
const MULTIPALETTENAMES = [_('music'), _('logic'), _('graphics')];

function getMainToolbarButtonNames(name) {
   return (['popdown-palette', 'run', 'step', 'step-music', 'stop-turtle', 'hard-stop-turtle', 'palette', 'help', 'sugarizer-stop', 'beginner', 'advanced', 'planet', 'planet-disabled', 'open', 'save', 'new'].indexOf(name) > -1);
};


function getAuxToolbarButtonNames(name) {
   return (['paste-disabled', 'Cartesian', 'compile', 'utility', 'restore-trash', 'hide-blocks', 'collapse-blocks', 'go-home'].indexOf(name) > -1);
};


function beginnerBlock(name) {
   // Only these blocks appear on the palette in beginner mode.
   return ['newnote', 'note4', 'rest2', 'mynotevalue',  // notes palette
           'meter', 'setmasterbpm2', 'everybeatdo', 'beatvalue',  // meter palette
           'pitch', 'pitch2', 'pitchnumber', 'hertz', 'steppitch', 'fourth', 'fifth', 'mypitch', 'pitchinhertz', // pitch palette
           'setkey2', 'modelength', 'thirdinterval', 'sixthinterval', 'chordI', 'chordIV', 'chordV', // interval palette
           'settimbre', 'newstaccato', 'newslur', 'vibrato', 'neighbor2', 'chorus', 'dis', 'phaser', 'tremolo', // tone palette
           'crescendo', 'decrescendo', 'setsynthvolume',  // volume palette
           'playdrum', 'setdrum', // drum palette
           'if', 'ifthenelse', 'repeat', 'forever', 'backward', 'duplicatenotes',  // flow palette
           'action', 'start', 'do', 'dispatch', 'listen',  // action palette
           'storebox1', 'box1', 'storebox2', 'box2', 'increment', 'incrementOne',  // boxes palette
           'status', 'matrix', 'rhythmruler2', 'pitchslider', 'rhythm2', 'stuplet',  // widgets palette
           'forward', 'back', 'left', 'right', 'setxy', 'arc', 'x', 'y', 'heading', 'scrollxy',  // mouse palette
           'setpensize', 'penup', 'pendown', 'color', 'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'black', 'white',  // pen palette
           'number', 'random', 'oneOf', 'plus', 'minus', 'multiply', 'divide',  // number palette
           'equal', 'less', 'greater',  // boolean palette
           'text', 'media', 'show', 'turtleshell', 'speak', 'height', 'width', 'bottompos', 'toppos', 'leftpos', 'rightpos',  // media palette
           'mousebutton', 'mousex', 'mousey', 'time', 'myclick', // sensor palette
           'push', 'pop', 'setHeapEntry', 'indexHeap', 'reverseHeap', 'emptyHeap', 'heapEmpty', 'heapLength', 'showHeap',  // heap palette
           'setturtlename2', 'turtlename', // mice palette
           'print',  // extras palette
          ].indexOf(name) !== -1
};


function createDefaultStack() {
   DATAOBJS =
       [[0, 'start', screen.width / 3, 100, [null, 1, null]],

        [1, 'settimbre', 0, 0, [0, 2, 4, 3]],
        [2, ['voicename', {'value': 'guitar'}], 0, 0, [1]],
        [3, 'hidden', 0, 0, [1, null]],

        [4, 'newnote', 0, 0, [1, 5, 8, 12]],
        [5, 'divide', 0, 0, [4, 6, 7]],
        [6, ['number', {'value': 1}], 0, 0, [5]],
        [7, ['number', {'value': 4}], 0, 0, [5]],
        [8, 'vspace', 0, 0, [4, 9]],
        [9, 'pitch', 0, 0, [8, 10, 11, null]],
        [10, ['solfege', {'value': 'sol'}], 0, 0, [9]],
        [11, ['number', {'value': 4}], 0, 0, [9]],
        [12, 'hidden', 0, 0, [4, 13]],

        [13, 'newnote', 0, 0, [12, 14, 17, 21]],
        [14, 'divide', 0, 0, [13, 15, 16]],
        [15, ['number', {'value': 1}], 0, 0, [14]],
        [16, ['number', {'value': 4}], 0, 0, [14]],
        [17, 'vspace', 0, 0, [13, 18]],
        [18, 'pitch', 0, 0, [17, 19, 20, null]],
        [19, ['solfege', {'value': 'mi'}], 0, 0, [18]],
        [20, ['number', {'value': 4}], 0, 0, [18]],
        [21, 'hidden', 0, 0, [13, 22]],

        [22, 'newnote', 0, 0, [21, 23, 26, 30]],
        [23, 'divide', 0, 0, [22, 24, 25]],
        [24, ['number', {'value': 1}], 0, 0, [23]],
        [25, ['number', {'value': 2}], 0, 0, [23]],
        [26, 'vspace', 0, 0, [22, 27]],
        [27, 'pitch', 0, 0, [26, 28, 29, null]],
        [28, ['solfege', {'value': 'sol'}], 0, 0, [27]],
        [29, ['number', {'value': 4}], 0, 0, [27]],
        [30, 'hidden', 0, 0, [22, null]]
       ];
};


function createHelpContent() {
   if (beginnerMode) {
	HELPCONTENT = [
           [_('Welcome to Music Blocks'), _('Music Blocks is a collection of manipulative tools for exploring fundamental musical concepts in an integrative and fun way.'), 'activity/activity-icon-mouse-color.svg'],
           [_('Meet Mr. Mouse!'), _('Mr Mouse is our Music Blocks conductor.') + ' ' + _('Mr Mouse encourages you to explore Music Blocks.') + ' ' + _('Let us start our tour!'), 'activity/activity-icon-mouse-color.svg'],
           [_('Palette buttons'), _('This toolbar contains the palette buttons, including Rhythm Pitch Tone Action and more.') + ' ' + _('Click to show the palettes of blocks and drag blocks from the palettes onto the canvas to use them.'), 'images/icons.svg'],
           [_('Play'), _('Click the run button to run the project in fast mode.'), 'header-icons/run-button.svg'],
           [_('Stop'), _('Stop the music (and the mice).') + ' ' + _('You can also type Alt-S to stop.'), 'header-icons/stop-turtle-button.svg'],
           [_('New Project'), _('Initialise a new project.'), 'header-icons/new-button.svg'],
           [_('Load project from file'), _('You can also load projects from the file system.'), 'header-icons/open-button.svg'],
           [_('Save project'), _('Save your project to a file.'), 'header-icons/save-button.svg'],
           [_('Find and share projects'), _('This button opens a viewer for sharing projects and for finding example projects.'), 'header-icons/planet-button.svg'],
           [_('Expand/collapse option toolbar'), _('Click this button to expand or collapse the auxillary toolbar.'), 'header-icons/menu-button.svg'],
           [_('Help'), _('Show these messages.'), 'header-icons/help-button.svg'],
           [_('Run slow'), _('Click to run the project in slow mode.'), 'header-icons/slow-button.svg'],
           [_('Run step by step'), _('Click to run the project step by step.'), 'header-icons/step-button.svg'],
           [_('Show/hide blocks'), _('Hide or show the blocks and the palettes.'), 'header-icons/hide-blocks-button.svg'],
           [_('Expand/collapse collapsable blocks'), _('Expand or collapse start and action stacks.'), 'header-icons/collapse-blocks-button.svg'],
           [_('Home'), _('Return all blocks to the center of the screen.'), 'header-icons/go-home-button.svg'],
           [_('Cartesian') + '/' + _('Polar'), _('Show or hide a coordinate grid.'), 'header-icons/Cartesian-polar-button.svg'],
           [_('Settings'), _('Open a panel for configuring Music Blocks.'), 'header-icons/utility-button.svg'],
           [_('Restore'), _('Restore blocks from the trash.'), 'header-icons/restore-trash-button.svg'],
           [_('Switch mode'), _('Switch between beginner and advance modes.'), 'header-icons/advanced-button.svg'],
           [_('Select language'), _('Select your language preference.'), 'header-icons/language-button.svg'],
           [_('Decrease block size'), _('Decrease the size of the blocks.'), 'header-icons/smaller-button.svg'],
           [_('Increase block size'), _('Increase the size of the blocks.'), 'header-icons/bigger-button.svg'],
           [_('Clean'), _('Clear the screen and return the mice to their initial positions.'), 'header-icons/clear-button.svg'],
           [_('Collapse'), _('Collapse the graphics window.'), 'header-icons/collapse-button.svg'],
           [_('Keyboard shortcuts'), _('You can type "d" to create a "do" block, "r" to create a "re" block, etc.'), 'header-icons/type-icon.svg'],
           [_('Guide'), _('A detailed guide to Music Blocks is available.'), 'activity/activity-icon-mouse-color.svg', 'https://sugarlabs.github.io/musicblocks/guide', _('Music Blocks Guide')],
           [_('Congratulations.'), _('You have finished the tour. Please enjoy Music Blocks!'), 'activity/activity-icon-mouse-color.svg']
	];
   } else {
	HELPCONTENT = [
           [_('Welcome to Music Blocks'), _('Music Blocks is a collection of manipulative tools for exploring fundamental musical concepts in an integrative and fun way.'), 'activity/activity-icon-mouse-color.svg'],
           [_('Meet Mr. Mouse!'), _('Mr Mouse is our Music Blocks conductor.') + ' ' + _('Mr Mouse encourages you to explore Music Blocks.') + ' ' + _('Let us start our tour!'), 'activity/activity-icon-mouse-color.svg'],
           //.TRANS: the buttons used to open various palettes of blocks
           [_('Palette buttons'),
            //.TRANS: Please add commas to list: Rhythm, Pitch, Tone, Action, and more.
            _('This toolbar contains the palette buttons, including Rhythm Pitch Tone Action and more.') + ' ' + _('Click to show the palettes of blocks and drag blocks from the palettes onto the canvas to use them.'), 'images/icons.svg'],
           // [_('Play music'), _('Click to run the music note by note.') + ' ' + _('Alternatively, you can hit the ENTER or RETURN key.'), 'header-icons/play-button.svg'],
           [_('Run fast'), _('Click the run button to run the project in fast mode.'), 'header-icons/run-button.svg'],
           [_('Run slow'), _('Click to run the project in slow mode.'), 'header-icons/slow-button.svg'],
           // [_('Run music slow'), _('Extra-long press the run button to run the music in slow mode.'), 'header-icons/slow-music-button.svg'],
           [_('Run step by step'), _('Click to run the project step by step.'), 'header-icons/step-button.svg'],
           // [_('Run note by note'), _('Click to run the music note by note.'), 'header-icons/step-music-button.svg'],
           [_('Stop'), _('Stop the music (and the mice).') + ' ' + _('You can also type Alt-S to stop.'), 'header-icons/stop-turtle-button.svg'],
           [_('Expand/collapse option toolbar'), _('Click this button to expand or collapse the auxiliary toolbar.'), 'header-icons/menu-button.svg'],
           [_('Help'), _('Show these messages.'), 'header-icons/help-button.svg'],
           [_('Clean'), _('Clear the screen and return the mice to their initial positions.'), 'header-icons/clear-button.svg'],
           [_('Collapse'), _('Collapse the graphics window.'), 'header-icons/collapse-button.svg'],
           [_('Show/hide blocks'), _('Hide or show the blocks and the palettes.'), 'header-icons/hide-blocks-button.svg'],
           [_('Expand/collapse collapsible blocks'), _('Expand or collapse start and action stacks.'), 'header-icons/collapse-blocks-button.svg'],
           [_('Home'), _('Return all blocks to the center of the screen.'), 'header-icons/go-home-button.svg'],
           [_('Expand/collapse option toolbar'), _('Click this button to expand or collapse the auxiliary toolbar.'), 'header-icons/menu-button.svg'],
           [_('New Project'), _('Initialize a new project.'), 'header-icons/new-button.svg'],
           [_('Load project from file'), _('You can also load projects from the file system.'), 'header-icons/open-button.svg'],
           [_('Save project'), _('Save your project to a file.'), 'header-icons/save-button.svg'],
           [_('Load samples from server'), _('This button opens a viewer for loading example projects.'), 'header-icons/planet-button.svg'],
           [_('Save sheet music'), _('Save your project to as a Lilypond file.'), 'header-icons/lilypond-button.svg'],
           // [_('Copy'), _('To copy a stack to the clipboard, right-click on the stack.') + ' ' + _('You can also use Alt+C to copy a stack of blocks.') + ' ' + _('The Paste Button will highlight.'), 'header-icons/paste-button.svg'],
           // [_('Paste'), _('The paste button is enabled when there are blocks copied onto the clipboard.') + ' ' + _('You can also use Alt+V to paste a stack of blocks. '), 'header-icons/paste-disabled-button.svg'],
           [_('Cartesian') + '/' + _('Polar'), _('Show or hide a coordinate grid.'), 'header-icons/Cartesian-polar-button.svg'],
           // [_('Polar'), _('Show or hide a polar-coordinate grid.'), 'header-icons/polar-button.svg'],
           [_('Settings'), _('Open a panel for configuring Music Blocks.'), 'header-icons/utility-button.svg'],
           [_('Switch mode'), _('Switch between beginner and advance modes.'), 'header-icons/advanced-button.svg'],
           [_('Enable scrolling'), _('You can scroll the blocks on the canvas.'), 'header-icons/scroll-unlock-button.svg'],
           [_('Decrease block size'), _('Decrease the size of the blocks.'), 'header-icons/smaller-button.svg'],
           [_('Increase block size'), _('Increase the size of the blocks.'), 'header-icons/bigger-button.svg'],
           [_('Display statistics'), _('Display statistics about your Music project.'), 'header-icons/stats-button.svg'],
           [_('Delete plugin'), _('Delete a selected plugin.'), 'header-icons/plugins-delete-button.svg'],
           [_('Select language'), _('Select your language preference.'), 'header-icons/language-button.svg'],
           [_('Restore'), _('Restore blocks from the trash.'), 'header-icons/restore-trash-button.svg'],
           [_('Keyboard shortcuts'), _('You can type "d" to create a "do" block, "r" to create a "re" block, etc.'), 'header-icons/type-icon.svg'],
           [_('Guide'), _('A detailed guide to Music Blocks is available.'), 'activity/activity-icon-mouse-color.svg', 'https://sugarlabs.github.io/musicblocks/guide', _('Music Blocks Guide')],
           [_('Congratulations.'), _('You have finished the tour. Please enjoy Music Blocks!'), 'activity/activity-icon-mouse-color.svg']
	];
   }

   BLOCKHELP = {
	// Rhythm palette
	'newnote': [_('The <em>Note</em> block is a container for one or more <em>Pitch</em> blocks. The <em>Note</em> block specifies the duration (note value) of its contents.'), 'documentation', 'notevalue.svg'],
	'playdrum': [_('You can use multiple <em>Drum</em> blocks within a <em>Note</em> block.'), 'documentation', 'playdrum.svg'],
	'rest2': [_('A rest of the specified note value duration can be constructed using a <em>Silence</em> block.'), 'documentation', 'silence.svg'],
	'mynotevalue': [_('The <em>Note value</em> block is the value of the duration of the note currently being played.'), 'documentation', 'mynotevalue.svg'],
	// Meter palette
	'meter': [_('The beat of the music is determined by the <em>Meter</em> block (by default, 4 1/4 notes per measure).'), 'documentation', 'meter.svg'],
	'setmasterbpm2': [_('The <em>Beats per minute</em> block sets the number of 1/4 notes per minute.'), 'documentation', 'setmasterbpm.svg'],
	'everybeatdo': [_('The <em>On-every-beat</em> block let you specify actions to take on every beat.'), 'documentation', 'beatcount.svg'],
	'beatvalue': [_('The <em>Beat count</em> block is the number of the current beat, e.g., 1, 2, 3, or 4.\n In the figure, it is used to take an action on the first beat of each measure.'), 'documentation', 'beatcount.svg'],
	// Pitch palette
       'pitch': [_('The <em>Pitch</em> block specifies the pitch name and octave of a note that together determine the frequency of the note.'), 'documentation', 'pitch.svg'],
	'solfege': [_('Pitch can be specified in terms of <em>do re mi fa sol la ti<em>.'), 'documentation', 'pitch.svg'],
	'notename': [_('Pitch can be specified in terms of <em>C D E F G A B</em>.'), 'documentation', 'notename.svg'],
	'steppitch': [_('The <em>Scaler Step</em> block (in combination with a <em>Number</em> block) will play the next pitch in a scale, e.g., if the last note played was <em>sol</em>, <em>Scalar Step 1</em> will play <em>la</em>.'), 'documentation', 'scalarstep.svg'],
	'hertz': [_('The <em>Hertz</em> block (in combination with a <em>Number</em> block) will play a sound at the specified frequency.'), 'documentation', 'hertz.svg'],
	'setscalartransposition': [_('The <em>Scalar transposition</em> block will shift the pitches contained inside <em>Note</em> blocks up (or down) the scale. In the example shown above, <em>sol</em> is shifted up to <em>la</em>.'), 'documentation', 'setscalartransposition.svg'],
	'pitchinhertz': [_('The <em>Pitch in Hertz</em> block is the value in Hertz of the pitch of the note currently being played.'), 'documentation', ''],
	'mypitch': [_('The <em>Pitch number</em> block is the value of the pitch of the note currently being played.'), 'documentation', 'mypitch.svg'],
       // Intervals palette
       'setkey2': [_('The <em>Set key</em> block is used to set the key and mode, e.g., <em>C Major</em>'), 'documentation', 'setkey2.svg'],
	'modelength': [_('The <em>Mode length</em> block is the number of notes in the current scale. Most <em>Western</em> scales have 7 notes.'), 'documentation', 'modelength.svg'],
	'interval': [_('The <em>Scalar interval</em> block calculates a relative interval based on the current mode, skipping all notes outside of the mode. In the figure, we add <em>la</em> to <em>sol</em>.'), 'documentation', 'interval.svg'],
	// Tone palette
       'settimbre': [_('The <em>Set timbre</em> block selects a voice for the synthesizer, e.g., guitar, piano, violin, or cello.'), 'documentation', 'settimbre.svg'],
	'newstaccato': [_('The <em>Staccato</em> block shortens the length of the actual notewhile maintaining the specified rhythmic value of the notes.'), 'documentation', 'staccato.svg'],
	'newslur': [_('The <em>Slur</em> block lengthens the sustain of noteswhile maintaining the specified rhythmic value of the notes.'), 'documentation', 'slur.svg'],
	'vibrato': [_('The <em>Vibrato</em> block adds a rapid, slight variation in pitch.'), 'documentation', 'vibrato.svg'],
	'chorus': [_('The <em>Chorus</em> block adds a chorus effect.'), 'documentation', 'chorus.svg'],
	'phaser': [_('The <em>Phaser</em> block adds a sweeping sound.'), 'documentation', 'phaser.svg'],
	'dis': [_('The <em>Distortion</em> block adds distortion to the pitch.'), 'documentation', 'distortion.svg'],
	'neighbor2': [_('The <em>Neighbor</em> block rapidly switches between neighboring pitches.'), 'documentation', 'neighbor.svg'],
	'tremolo': [_('The <em>Tremolo</em> block adds a wavering effect.'), 'documentation', 'tremolo.svg'],
	// Volume palette
       'crescendo': [_('The <em>Crescendo</em> block will increase the volume of the contained notes by a specified amount for every note played. For example, if you have 7 notes in sequence contained in a <em>Crescendo</em> block with a value of 5, the final note will be at 35% more than the starting volume.'), 'documentation', 'crescendo.svg'],
       'decrescendo': [_('The <em>Decrescendo</em> block will decrease the volume of the contained notes by a specified amount for every note played. For example, if you have 7 notes in sequence contained in a <em>Decrescendo</em> block with a value of 5, the final note will be at 35% less than the starting volume.'), 'documentation', 'decrescendo.svg'],
	'setsynthvolume': [_('The <em>Set synth volume</em> block will change the volume of a particular synth, e.g., guitar, violin, snare drum, etc. The default volume is 50; the range is 0 (silence) to 100 (full volume).'), 'documentation', 'setsynthvolume.svg'],
	// Drum palette
	// 'playdrum' is described on the Rhythm palette.
	'setdrum': [_('The <em>Set drum</em> block will select a drum sound to replace the pitch of any contained notes. In the example above, a <em>kick drum</em> sound will be played instead of <em>sol</em>.'), 'documentation', 'setdrum.svg'],
	// Widgets palette
	'status': [_('The <em>Status</em> block opens a tool for inspecting the status of Music Blocks as it is running.'), 'documentation', 'status.svg'],
	'matrix': [_('The <em>Pitch-time Matrix</em> block opens a tool to create musical phrases.'), 'documentation', 'status.svg'],
	'rhythmruler2': [_('The <em>Rhythm Ruler</em> block opens a tool to create drum machines.'), 'documentation', 'status.svg'],
	'pitchslider': [_('The <em>Pitch-slider<em> block opens a tool to generate arbitray pitches.'), 'documentation', 'status.svg'],
	'rhythm2': [_('The <em>Rhythm</em> block is used to generate rhythm patterns.'), 'documentation', 'status.svg'],
	'stuplet': [_('<em>Tuplets</em> are a collection of notes that get scaled to a specific duration. Using tuplets makes it easy to create groups of notes that are not based on a power of 2.'), 'documentation', 'status.svg'],
	// Flow palette
	'repeat': [_('The <em>Repeat</em> block will repeat the contained blocks. In this example, the note will be played 4 times.'), 'documentation', 'repeat.svg'],
	'forever': [_('The <em>Forever</em> block will repeat the contained blocks forever. In this example, a simple drum machine, a kick drum will play 1/4 notes forever.'), 'documentation', 'forever.svg'],
       'if':  [_('Conditionals lets your program take different actions depending on the <em>condition</em>. In this example, <em>if</em> the mouse button is pressed, a snare drum will play. Otherwise (<em>else</em>) a kick drum will play.'), 'documentation', 'conditional.svg'],
	'ifthenelse': [_('Conditionals lets your program take different actions depending on the <em>condition</em>. In this example, <em>if</em> the mouse button is pressed, a snare drum will play. Otherwise (<em>else</em>) a kick drum will play.'), 'documentation', 'conditional.svg'],
	'duplicatenotes': [_('The <em>Duplicate</em> block will run each block multiple times. The output of the example is: Sol, Sol, Sol, Sol, Re, Re, Re, Re, Sol, Sol, Sol, Sol.'), 'documentation', 'status.svg'],
	'backward': [_('The <em>Backward</em> block runs code in reverse order (Musical retrograde).'), 'documentation', 'status.svg'],
	// Action palette
	'action': [_('The <em>Action</em> block is used to group together blocks so that they can be used more than once. It is often used for storing a phrase of music that is repeated.'), 'documentation', 'status.svg'],
	'start': [_('Each <em>Start</em> block is a separate voice. All of the <em>Start</em> blocks run at the same time when the <em>Play</em> button is pressed.'), 'documentation', 'status.svg'],
	'listen': [_('The <em>Listen</em> block is used to listen for an event such as a mouse click. When the event happens, an <em>action</em> is taken.'), 'documentation', 'status.svg'],
	'dispatch': [_('The <em>Dispatch</em> block is used to trigger an event.'), 'documentation', 'status.svg'],
	'do': [_('The <em>Do</em> block is used to initiate an action. In the example, it is used with the <em>One of</em> block to choose a random phase.'), 'documentation', 'status.svg'],
	// Boxes palette
       'storebox1': [_('The <em>Store in Box 1</em> block is used to store a value in <em>Box 1</em>.'), 'documentation', 'status.svg'],
	'box1': [_('The <em>Box 1</em> returns the value stored on <em>Box 1</em>.'), 'documentation', 'status.svg'],
       'storebox2': [_('The <em>Store in Box 2</em> block is used to store a value in <em>Box 2</em>.'), 'documentation', 'status.svg'],
	'box2': [_('The <em>Box 2</em> returns the value stored on <em>Box 2</em>.'), 'documentation', 'status.svg'],
	'increment': [_('The <em>Add-to</em> block is used to add to the value stored in a box. It can also be used with other blocks, such as <em>Color</em>, <em>Pen-size</em>. etc.'), 'documentation', 'status.svg'],
	'incrementOne': [_('The <em>Add-1-to<em> block adds one to the value stored in a box.'), 'documentation', 'status.svg'],
	// Number palette
       'number': [_('The <em>Number</em> block holds a number.'), 'documentation', 'status.svg'],
	'random': [_('The <em>Random</em> block returns a random number.'), 'documentation', 'status.svg'],
	'oneof': [_('The <em>One-of</em> block returns one of two choices.'), 'documentation', 'status.svg'],
	'plus': [_('The <em>Plus</em> block is used to add.'), 'documentation', 'status.svg'],
	'minus': [_('The <em>Minus</em> block is used to subtract.'), 'documentation', 'status.svg'],
	'multiply': [_('The <em>Multiply</em> block is used to multiply.'), 'documentation', 'status.svg'],
	'divide': [_('The <em>Divide</em> block is used to divide.'), 'documentation', 'status.svg'],
	// Boolean palette
	'greater': [_('The <em>Greater-than</em> block returns <em>True</em> if the top number is greater than the bottom number.'), 'documentation', 'status.svg'],
	'less': [_('The <em>Less-than</em> block returns <em>True</em> if the top number is less than the bottom number.'), 'documentation', 'status.svg'],
	'equal': [_('The <em>Equal</em> block returns <em>True</em> if the two numbers are equal.'), 'documentation', 'status.svg'],
	// Mouse palette
	'forward': [_('The <em>Forward</em> block moves the mouse forward.'), 'documentation', 'status.svg'],
	'back': [_('The <em>Back</em> block moves the mouse backward.'), 'documentation', 'status.svg'],
	'left': [_('The <em>Left</em> block turns the mouse to the left.'), 'documentation', 'status.svg'],
	'right': [_('The <em>Right</em> block turns the mouse to the right.'), 'documentation', 'status.svg'],
	'arc': [_('The <em>Arc</em> block moves the mouse in a arc.'), 'documentation', 'status.svg'],
	'setxy': [_('The <em>Set XY</em> block moves the mouse to a specific position on the screen.'), 'documentation', 'status.svg'],
	'scrollxy': [_('The <em>Scroll XY</em> block moves the canvas.'), 'documentation', 'status.svg'],
	'x': [_('The <em>X</em> block returns the horizontal position of the mouse.'), 'documentation', 'status.svg'],
	'y': [_('The <em>Y</em> block returns the vertical position of the mouse.'), 'documentation', 'status.svg'],
	'heading': [_('The <em>Heading</em> block returns the orientation of the mouse.'), 'documentation', 'status.svg'],
	// Pen palette
	'setpensize': [_('The <em>Set-pen-size</em> block changes the size of the pen.'), 'documentation', 'status.svg'],
	'penup': [_('The <em>Pen-up</em> block raises the pen so that it does not draw.'), 'documentation', 'status.svg'],
	'pendown': [_('The <em>Pen-down</em> block lowers the pen so that it draws.'), 'documentation', 'status.svg'],
	'color': [_('The <em>Color</em> block returns the current pen color.'), 'documentation', 'status.svg'],
	'setcolor': [_('The <em>Set-color</em> block changes the pen color.'), 'documentation', 'status.svg'],
	// Media palette
	'print': [_('The <em>Print</em> block displays text at the top of the screen.'), 'documentation', 'status.svg'],
	'text': [_('The <em>Text</em> block holds a text string.'), 'documentation', 'status.svg'],
	'media': [_('The <em>Media</em> block is used to import an image.'), 'documentation', 'status.svg'],
	'show': [_('The <em>Show</em> block is used to display text or images on the canvas.'), 'documentation', 'status.svg'],
	'turtleshell': [_('The <em>Shell</em> block is used to change the appearance of the mouse.'), 'documentation', 'status.svg'],
	'speak': [_('The <em>Speak</em> block outputs to the text-to-speech synthesizer'), 'documentation', 'status.svg'],
	'height': [_('The <em>Height</em> block returns the height of the canvas.'), 'documentation', 'status.svg'],
	'width': [_('The <em>Width</em> block returns the width of the canvas.'), 'documentation', 'status.svg'],
	'toppos': [_('The <em>Top</em> block returns the position of the top of the canvas.'), 'documentation', 'status.svg'],
	'bottompos': [_('The <em>Bottom</em> block returns the position of the bottom of the canvas.'), 'documentation', 'status.svg'],
	'leftpos': [_('The <em>Left</em> block returns the position of the left of the canvas.'), 'documentation', 'status.svg'],
	'rightpos': [_('The <em>Right</em> block returns the position of the right of the canvas.'), 'documentation', 'status.svg'],
	// Sensors palette
	'mousebutton': [_('The <em>Mouse-button</em> block returns <em>True</em> if the mouse button is pressed.'), 'documentation', 'status.svg'],
	'mousex': [_('The <em>Cursor X</em> block returns the horizontal position of the mouse.'), 'documentation', 'status.svg'],
	'mousey': [_('The <em>Cursor Y</em> block returns the veritcal position of the mouse.'), 'documentation', 'status.svg'],
	'time': [_('The <em>Time</em> block returns the number of seconds that the program has been running.'), 'documentation', 'status.svg'],
	'click': [_('The <em>Click</em> block returns <em>True</em> if a mouse has been clicked.'), 'documentation', 'status.svg'],
	// Mice palette
	'setturtlename2': [_('The <em>Set-name</em> block is used to name a mouse.'), 'documentation', 'status.svg'],
	'turtlename': [_('The <em>Mouse-name</em> block returns the name of a mouse.'), 'documentation', 'status.svg'],
	// Advanced blocks
	'turtlesync': [_('The <em>Mouse-sync</em> block aligns the beat count between mice.'), 'documentation', 'status.svg'],
	'onbeatdo': [_('The <em>On-strong-beat</em> block let you specify actions to take on specified beats.'), 'documentation', 'onstrongbeatdo.svg'],
	'offbeatdo': [_('The <em>On-weak-beat</em> block let you specify actions to take on weak (off) beats.'), 'documentation', 'onweakbeatdo.svg'],
	'no-clock': [_('The <em>No clock</em> block decouples the notes from the master clock.'), 'documentation', 'no-clock.svg'],
	'accidental': [_('The <em>Accidental</em> block is used to create <em>sharps</em> and <em>flats</em>'), 'documentation', 'accidental.svg'],
	'accidentalname': [_('The <em>Accidental selector</em> block is used to choose between double-sharp, sharp, natural, flat, and double-flat.'), 'documentation', 'accidental.svg'],
	'settransposition': [_('The <em>Semi-tone transposition</em> block will shift the pitches contained inside <em>Note</em> blocks up (or down) by half steps. In the example shown above, <em>sol</em> is shifted up to <em>sol#</em>.'), 'documentation', 'settransposition.svg'],
	'deltapitch': [_('The <em>Change in pitch</em> block is the difference (in half steps) between the current pitch being played and the previous pitch played.'), 'documentation', 'deltapitch.svg'],
	'movable': ['???', 'documentation', 'movable.svg'],
	'semitoneinterval': [_('The <em>Semi-tone interval</em> block calculates a relative interval based on half steps. In the figure, we add <em>sol#</em> to <em>sol</em>.'), 'documentation', 'semitoneinterval.svg'],
       'voicename': [_('The <em>Set timbre</em> block selects a voice for the synthesizer, e.g., guitar, piano, violin, or cello.'), 'documentation', 'settimbre.svg'],
   }
};
