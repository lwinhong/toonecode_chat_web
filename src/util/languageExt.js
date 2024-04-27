

export const getLanguageExtByFilePath = (filePath) => {
    if (!filePath)
        return ""

    const fileExt = filePath.split('.').pop().toLowerCase()
    return EXT2LANG["." + fileExt] || ""
}

export const EXT2LANG = {
    ".abap": "abap",
    ".ash": "ags script",
    ".ampl": "ampl",
    ".g4": "antlr",
    ".apib": "api blueprint",
    ".apl": "apl",
    ".dyalog": "apl",
    ".asp": "asp",
    ".asax": "asp",
    ".ascx": "asp",
    ".ashx": "asp",
    ".asmx": "asp",
    ".aspx": "asp",
    ".axd": "asp",
    ".dats": "ats",
    ".hats": "ats",
    ".sats": "ats",
    ".as": "actionscript",
    ".adb": "ada",
    ".ada": "ada",
    ".ads": "ada",
    ".agda": "agda",
    ".als": "alloy",
    ".apacheconf": "apacheconf",
    ".vhost": "apacheconf",
    ".applescript": "applescript",
    ".scpt": "applescript",
    ".arc": "arc",
    ".ino": "arduino",
    ".asciidoc": "asciidoc",
    ".adoc": "asciidoc",
    ".aj": "aspectj",
    ".asm": "assembly",
    ".a51": "assembly",
    ".nasm": "assembly",
    ".aug": "augeas",
    ".ahk": "autohotkey",
    ".ahkl": "autohotkey",
    ".au3": "autoit",
    ".awk": "awk",
    ".auk": "awk",
    ".gawk": "awk",
    ".mawk": "awk",
    ".nawk": "awk",
    ".bat": "batchfile",
    ".cmd": "batchfile",
    ".befunge": "befunge",
    ".bison": "bison",
    ".bb": "bitbake",
    ".decls": "blitzbasic",
    ".bmx": "blitzmax",
    ".bsv": "bluespec",
    ".boo": "boo",
    ".bf": "brainfuck",
    ".brs": "brightscript",
    ".bro": "bro",
    ".c": "c",
    ".cats": "c",
    ".h": "c++",
    ".idc": "c",
    ".w": "c",
    ".cs": "c#",
    ".cake": "c#",
    ".cshtml": "c#",
    ".csx": "c#",
    ".cpp": "c++",
    ".c++": "c++",
    ".cc": "c++",
    ".cp": "c++",
    ".cxx": "c++",
    ".h++": "c++",
    ".hh": "c++",
    ".hpp": "c++",
    ".hxx": "c++",
    ".inl": "c++",
    ".ipp": "c++",
    ".tcc": "c++",
    ".tpp": "c++",
    ".C": "c++",
    ".H": "c++",
    ".c-objdump": "c-objdump",
    ".chs": "c2hs haskell",
    ".clp": "clips",
    ".cmake": "cmake",
    ".cmake.in": "cmake",
    ".cob": "cobol",
    ".cbl": "cobol",
    ".ccp": "cobol",
    ".cobol": "cobol",
    ".cpy": "cobol",
    ".css": "css",
    ".csv": "csv",
    ".capnp": "cap'n proto",
    ".mss": "cartocss",
    ".ceylon": "ceylon",
    ".chpl": "chapel",
    ".ck": "chuck",
    ".cirru": "cirru",
    ".clw": "clarion",
    ".icl": "clean",
    ".dcl": "clean",
    ".click": "click",
    ".clj": "clojure",
    ".boot": "clojure",
    ".cl2": "clojure",
    ".cljc": "clojure",
    ".cljs": "clojure",
    ".cljs.hl": "clojure",
    ".cljscm": "clojure",
    ".cljx": "clojure",
    ".hic": "clojure",
    ".coffee": "coffeescript",
    "._coffee": "coffeescript",
    ".cjsx": "coffeescript",
    ".cson": "coffeescript",
    ".iced": "coffeescript",
    ".cfm": "coldfusion",
    ".cfml": "coldfusion",
    ".cfc": "coldfusion cfc",
    ".lisp": "common lisp",
    ".asd": "common lisp",
    ".lsp": "common lisp",
    ".ny": "common lisp",
    ".podsl": "common lisp",
    ".sexp": "common lisp",
    ".cps": "component pascal",
    ".coq": "coq",
    ".cppobjdump": "cpp-objdump",
    ".c++-objdump": "cpp-objdump",
    ".c++objdump": "cpp-objdump",
    ".cpp-objdump": "cpp-objdump",
    ".cxx-objdump": "cpp-objdump",
    ".creole": "creole",
    ".cr": "crystal",
    ".csd": "csound",
    ".feature": "cucumber",
    ".cu": "cuda",
    ".cuh": "cuda",
    ".cy": "cycript",
    ".pyx": "cython",
    ".pxd": "cython",
    ".pxi": "cython",
    ".di": "d",
    ".d-objdump": "d-objdump",
    ".com": "digital command language",
    ".dm": "dm",
    ".zone": "dns zone",
    ".arpa": "dns zone",
    ".darcspatch": "darcs patch",
    ".dpatch": "darcs patch",
    ".dart": "dart",
    ".diff": "diff",
    ".patch": "diff",
    ".dockerfile": "dockerfile",
    "Dockerfile": "dockerfile",
    ".djs": "dogescript",
    ".dylan": "dylan",
    ".dyl": "dylan",
    ".intr": "dylan",
    ".lid": "dylan",
    ".E": "e",
    ".ecl": "ecl",
    ".eclxml": "ecl",
    ".sch": "eagle",
    ".brd": "eagle",
    ".epj": "ecere projects",
    ".e": "eiffel",
    ".ex": "elixir",
    ".exs": "elixir",
    ".elm": "elm",
    ".el": "emacs lisp",
    ".emacs": "emacs lisp",
    ".emacs.desktop": "emacs lisp",
    ".em": "emberscript",
    ".emberscript": "emberscript",
    ".erl": "erlang",
    ".escript": "erlang",
    ".hrl": "erlang",
    ".xrl": "erlang",
    ".yrl": "erlang",
    ".fs": "f#",
    ".fsi": "f#",
    ".fsx": "f#",
    ".flux": "flux",
    ".f90": "fortran",
    ".f": "fortran",
    ".f03": "fortran",
    ".f08": "fortran",
    ".f77": "fortran",
    ".f95": "fortran",
    ".for": "fortran",
    ".fpp": "fortran",
    ".factor": "factor",
    ".fy": "fancy",
    ".fancypack": "fancy",
    ".fan": "fantom",
    ".eam.fs": "formatted",
    ".fth": "forth",
    ".4th": "forth",
    ".forth": "forth",
    ".frt": "forth",
    ".ftl": "freemarker",
    ".g": "g-code",
    ".gco": "g-code",
    ".gcode": "g-code",
    ".gms": "gams",
    ".gap": "gap",
    ".gi": "gap",
    ".s": "gas",
    ".gd": "gdscript",
    ".glsl": "glsl",
    ".fp": "glsl",
    ".frag": "glsl",
    ".frg": "glsl",
    ".fsh": "glsl",
    ".fshader": "glsl",
    ".geo": "glsl",
    ".geom": "glsl",
    ".glslv": "glsl",
    ".gshader": "glsl",
    ".shader": "glsl",
    ".vert": "glsl",
    ".vrx": "glsl",
    ".vsh": "glsl",
    ".vshader": "glsl",
    ".kid": "genshi",
    ".ebuild": "gentoo ebuild",
    ".eclass": "gentoo eclass",
    ".po": "gettext catalog",
    ".pot": "gettext catalog",
    ".glf": "glyph",
    ".gp": "gnuplot",
    ".gnu": "gnuplot",
    ".gnuplot": "gnuplot",
    ".plot": "gnuplot",
    ".plt": "gnuplot",
    ".go": "go",
    ".golo": "golo",
    ".gst": "gosu",
    ".gsx": "gosu",
    ".vark": "gosu",
    ".grace": "grace",
    ".gradle": "gradle",
    ".gf": "grammatical framework",
    ".graphql": "graphql",
    ".dot": "graphviz (dot)",
    ".gv": "graphviz (dot)",
    ".man": "groff",
    ".1": "groff",
    ".1in": "groff",
    ".1m": "groff",
    ".1x": "groff",
    ".2": "groff",
    ".3": "groff",
    ".3in": "groff",
    ".3m": "groff",
    ".3qt": "groff",
    ".3x": "groff",
    ".4": "groff",
    ".5": "groff",
    ".6": "groff",
    ".7": "groff",
    ".8": "groff",
    ".9": "groff",
    ".me": "groff",
    ".rno": "groff",
    ".roff": "groff",
    ".groovy": "groovy",
    ".grt": "groovy",
    ".gtpl": "groovy",
    ".gvy": "groovy",
    ".gsp": "groovy server pages",
    ".hcl": "hcl",
    ".tf": "hcl",
    ".hlsl": "hlsl",
    ".fxh": "hlsl",
    ".hlsli": "hlsl",
    ".html": "html",
    ".htm": "html",
    ".html.hl": "html",
    ".xht": "html",
    ".xhtml": "html",
    ".mustache": "html+django",
    ".jinja": "html+django",
    ".eex": "html+eex",
    ".erb": "html+erb",
    ".erb.deface": "html+erb",
    ".phtml": "html+php",
    ".http": "http",
    ".haml": "haml",
    ".haml.deface": "haml",
    ".handlebars": "handlebars",
    ".hbs": "handlebars",
    ".hb": "harbour",
    ".hs": "haskell",
    ".hsc": "haskell",
    ".hx": "haxe",
    ".hxsl": "haxe",
    ".hy": "hy",
    ".dlm": "idl",
    ".ipf": "igor pro",
    ".ini": "ini",
    ".cfg": "ini",
    ".prefs": "ini",
    ".properties": "ini",
    ".irclog": "irc log",
    ".weechatlog": "irc log",
    ".idr": "idris",
    ".lidr": "idris",
    ".ni": "inform 7",
    ".i7x": "inform 7",
    ".iss": "inno setup",
    ".io": "io",
    ".ik": "ioke",
    ".thy": "isabelle",
    ".ijs": "j",
    ".flex": "jflex",
    ".jflex": "jflex",
    ".json": "json",
    ".geojson": "json",
    ".lock": "json",
    ".topojson": "json",
    ".json5": "json5",
    ".jsonld": "jsonld",
    ".jq": "jsoniq",
    ".jsx": "jsx",
    ".jade": "jade",
    ".j": "jasmin",
    ".java": "java",
    ".jsp": "java server pages",
    ".js": "javascript",
    "._js": "javascript",
    ".bones": "javascript",
    ".es6": "javascript",
    ".jake": "javascript",
    ".jsb": "javascript",
    ".jscad": "javascript",
    ".jsfl": "javascript",
    ".jsm": "javascript",
    ".jss": "javascript",
    ".njs": "javascript",
    ".pac": "javascript",
    ".sjs": "javascript",
    ".ssjs": "javascript",
    ".xsjs": "javascript",
    ".xsjslib": "javascript",
    ".jl": "julia",
    ".ipynb": "jupyter notebook",
    ".krl": "krl",
    ".kicad_pcb": "kicad",
    ".kit": "kit",
    ".kt": "kotlin",
    ".ktm": "kotlin",
    ".kts": "kotlin",
    ".lfe": "lfe",
    ".ll": "llvm",
    ".lol": "lolcode",
    ".lsl": "lsl",
    ".lslp": "lsl",
    ".lvproj": "labview",
    ".lasso": "lasso",
    ".las": "lasso",
    ".lasso8": "lasso",
    ".lasso9": "lasso",
    ".ldml": "lasso",
    ".latte": "latte",
    ".lean": "lean",
    ".hlean": "lean",
    ".less": "less",
    ".lex": "lex",
    ".ly": "lilypond",
    ".ily": "lilypond",
    ".ld": "linker script",
    ".lds": "linker script",
    ".liquid": "liquid",
    ".lagda": "literate agda",
    ".litcoffee": "literate coffeescript",
    ".lhs": "literate haskell",
    ".ls": "livescript",
    "._ls": "livescript",
    ".xm": "logos",
    ".x": "logos",
    ".xi": "logos",
    ".lgt": "logtalk",
    ".logtalk": "logtalk",
    ".lookml": "lookml",
    ".lua": "lua",
    ".nse": "lua",
    ".pd_lua": "lua",
    ".rbxs": "lua",
    ".wlua": "lua",
    ".mumps": "m",
    ".m4": "m4",
    ".mcr": "maxscript",
    ".mtml": "mtml",
    ".muf": "muf",
    ".mak": "makefile",
    ".mk": "makefile",
    ".mkfile": "makefile",
    "Makefile": "makefile",
    ".mako": "mako",
    ".mao": "mako",
    ".mpl": "maple",
    ".md": "markdown",
    ".markdown": "markdown",
    ".mkd": "markdown",
    ".mkdn": "markdown",
    ".mkdown": "markdown",
    ".ron": "markdown",
    ".mask": "mask",
    ".mathematica": "mathematica",
    ".cdf": "mathematica",
    ".ma": "mathematica",
    ".mt": "mathematica",
    ".nb": "mathematica",
    ".nbp": "mathematica",
    ".wl": "mathematica",
    ".wlt": "mathematica",
    ".matlab": "matlab",
    ".maxpat": "max",
    ".maxhelp": "max",
    ".maxproj": "max",
    ".mxt": "max",
    ".pat": "max",
    ".mediawiki": "mediawiki",
    ".wiki": "mediawiki",
    ".metal": "metal",
    ".minid": "minid",
    ".druby": "mirah",
    ".duby": "mirah",
    ".mir": "mirah",
    ".mirah": "mirah",
    ".mo": "modelica",
    ".mms": "module management system",
    ".mmk": "module management system",
    ".monkey": "monkey",
    ".moon": "moonscript",
    ".myt": "myghty",
    ".nsi": "nsis",
    ".nsh": "nsis",
    ".axs": "netlinx",
    ".axi": "netlinx",
    ".axs.erb": "netlinx+erb",
    ".axi.erb": "netlinx+erb",
    ".nlogo": "netlogo",
    ".nginxconf": "nginx",
    ".nim": "nimrod",
    ".nimrod": "nimrod",
    ".ninja": "ninja",
    ".nit": "nit",
    ".nix": "nix",
    ".nu": "nu",
    ".numpy": "numpy",
    ".numpyw": "numpy",
    ".numsc": "numpy",
    ".ml": "ocaml",
    ".eliom": "ocaml",
    ".eliomi": "ocaml",
    ".ml4": "ocaml",
    ".mli": "ocaml",
    ".mll": "ocaml",
    ".mly": "ocaml",
    ".objdump": "objdump",
    ".mm": "objective-c++",
    ".sj": "objective-j",
    ".oct": "octave",
    ".omgrofl": "omgrofl",
    ".opa": "opa",
    ".opal": "opal",
    ".cl": "opencl",
    ".opencl": "opencl",
    ".p": "openedge abl",
    ".scad": "openscad",
    ".org": "org",
    ".ox": "ox",
    ".oxh": "ox",
    ".oxo": "ox",
    ".oxygene": "oxygene",
    ".oz": "oz",
    ".pwn": "pawn",
    ".php": "php",
    ".aw": "php",
    ".ctp": "php",
    ".php3": "php",
    ".php4": "php",
    ".php5": "php",
    ".phps": "php",
    ".phpt": "php",
    ".pov": "pov-ray sdl",
    ".pan": "pan",
    ".psc": "papyrus",
    ".parrot": "parrot",
    ".pasm": "parrot assembly",
    ".pir": "parrot internal representation",
    ".pas": "pascal",
    ".dfm": "pascal",
    ".dpr": "pascal",
    ".lpr": "pascal",
    ".pl": "perl",
    ".al": "perl",
    ".perl": "perl",
    ".ph": "perl",
    ".plx": "perl",
    ".pm": "perl",
    ".psgi": "perl",
    ".t": "perl",
    ".6pl": "perl6",
    ".6pm": "perl6",
    ".nqp": "perl6",
    ".p6": "perl6",
    ".p6l": "perl6",
    ".p6m": "perl6",
    ".pl6": "perl6",
    ".pm6": "perl6",
    ".pkl": "pickle",
    ".pig": "piglatin",
    ".pike": "pike",
    ".pmod": "pike",
    ".pod": "pod",
    ".pogo": "pogoscript",
    ".pony": "pony",
    ".ps": "postscript",
    ".eps": "postscript",
    ".ps1": "powershell",
    ".psd1": "powershell",
    ".psm1": "powershell",
    ".pde": "processing",
    ".prolog": "prolog",
    ".yap": "prolog",
    ".spin": "propeller spin",
    ".proto": "protocol buffer",
    ".pub": "public key",
    ".pd": "pure data",
    ".pb": "purebasic",
    ".pbi": "purebasic",
    ".purs": "purescript",
    ".py": "python",
    ".bzl": "python",
    ".gyp": "python",
    ".lmi": "python",
    ".pyde": "python",
    ".pyp": "python",
    ".pyt": "python",
    ".pyw": "python",
    ".tac": "python",
    ".wsgi": "python",
    ".xpy": "python",
    ".pytb": "python traceback",
    ".qml": "qml",
    ".qbs": "qml",
    ".pri": "qmake",
    ".r": "r",
    ".rd": "r",
    ".rsx": "r",
    ".raml": "raml",
    ".rdoc": "rdoc",
    ".rbbas": "realbasic",
    ".rbfrm": "realbasic",
    ".rbmnu": "realbasic",
    ".rbres": "realbasic",
    ".rbtbar": "realbasic",
    ".rbuistate": "realbasic",
    ".rhtml": "rhtml",
    ".rmd": "rmarkdown",
    ".rkt": "racket",
    ".rktd": "racket",
    ".rktl": "racket",
    ".scrbl": "racket",
    ".rl": "ragel in ruby host",
    ".raw": "raw token data",
    ".reb": "rebol",
    ".r2": "rebol",
    ".r3": "rebol",
    ".rebol": "rebol",
    ".red": "red",
    ".reds": "red",
    ".cw": "redcode",
    ".rpy": "ren'py",
    ".rsh": "renderscript",
    ".robot": "robotframework",
    ".rg": "rouge",
    ".rb": "ruby",
    ".builder": "ruby",
    ".gemspec": "ruby",
    ".god": "ruby",
    ".irbrc": "ruby",
    ".jbuilder": "ruby",
    ".mspec": "ruby",
    ".podspec": "ruby",
    ".rabl": "ruby",
    ".rake": "ruby",
    ".rbuild": "ruby",
    ".rbw": "ruby",
    ".rbx": "ruby",
    ".ru": "ruby",
    ".ruby": "ruby",
    ".thor": "ruby",
    ".watchr": "ruby",
    ".rs": "rust",
    ".rs.in": "rust",
    ".sas": "sas",
    ".scss": "scss",
    ".smt2": "smt",
    ".smt": "smt",
    ".sparql": "sparql",
    ".rq": "sparql",
    ".sqf": "sqf",
    ".hqf": "sqf",
    ".pls": "sql",
    ".pck": "sql",
    ".pkb": "sql",
    ".pks": "sql",
    ".plb": "sql",
    ".plsql": "sql",
    ".sql": "sql",
    ".cql": "sql",
    ".ddl": "sql",
    ".prc": "sql",
    ".tab": "sql",
    ".udf": "sql",
    ".viw": "sql",
    ".db2": "sql",
    ".ston": "ston",
    ".svg": "svg",
    ".sage": "sage",
    ".sagews": "sage",
    ".sls": "saltstack",
    ".sass": "sass",
    ".scala": "scala",
    ".sbt": "scala",
    ".scaml": "scaml",
    ".scm": "scheme",
    ".sld": "scheme",
    ".sps": "scheme",
    ".ss": "scheme",
    ".sci": "scilab",
    ".sce": "scilab",
    ".self": "self",
    ".sh": "shell",
    ".bash": "shell",
    ".bats": "shell",
    ".command": "shell",
    ".ksh": "shell",
    ".sh.in": "shell",
    ".tmux": "shell",
    ".tool": "shell",
    ".zsh": "shell",
    ".sh-session": "shellsession",
    ".shen": "shen",
    ".sl": "slash",
    ".slim": "slim",
    ".smali": "smali",
    ".st": "smalltalk",
    ".tpl": "smarty",
    ".sol": "solidity",
    ".sp": "sourcepawn",
    ".sma": "sourcepawn",
    ".nut": "squirrel",
    ".stan": "stan",
    ".ML": "standard ml",
    ".fun": "standard ml",
    ".sig": "standard ml",
    ".sml": "standard ml",
    ".do": "stata",
    ".ado": "stata",
    ".doh": "stata",
    ".ihlp": "stata",
    ".mata": "stata",
    ".matah": "stata",
    ".sthlp": "stata",
    ".styl": "stylus",
    ".scd": "supercollider",
    ".swift": "swift",
    ".sv": "systemverilog",
    ".svh": "systemverilog",
    ".vh": "systemverilog",
    ".toml": "toml",
    ".txl": "txl",
    ".tcl": "tcl",
    ".adp": "tcl",
    ".tm": "tcl",
    ".tcsh": "tcsh",
    ".csh": "tcsh",
    ".tex": "tex",
    ".aux": "tex",
    ".bbx": "tex",
    ".bib": "tex",
    ".cbx": "tex",
    ".dtx": "tex",
    ".ins": "tex",
    ".lbx": "tex",
    ".ltx": "tex",
    ".mkii": "tex",
    ".mkiv": "tex",
    ".mkvi": "tex",
    ".sty": "tex",
    ".toc": "tex",
    ".tea": "tea",
    ".txt": "text",
    ".no": "text",
    ".textile": "textile",
    ".thrift": "thrift",
    ".tu": "turing",
    ".ttl": "turtle",
    ".twig": "twig",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".upc": "unified parallel c",
    ".anim": "unity3d asset",
    ".asset": "unity3d asset",
    ".mat": "unity3d asset",
    ".meta": "unity3d asset",
    ".prefab": "unity3d asset",
    ".unity": "unity3d asset",
    ".uno": "uno",
    ".uc": "unrealscript",
    ".ur": "urweb",
    ".urs": "urweb",
    ".vcl": "vcl",
    ".vhdl": "vhdl",
    ".vhd": "vhdl",
    ".vhf": "vhdl",
    ".vhi": "vhdl",
    ".vho": "vhdl",
    ".vhs": "vhdl",
    ".vht": "vhdl",
    ".vhw": "vhdl",
    ".vala": "vala",
    ".vapi": "vala",
    ".veo": "verilog",
    ".vim": "viml",
    ".vb": "visual basic",
    ".bas": "visual basic",
    ".frm": "visual basic",
    ".frx": "visual basic",
    ".vba": "visual basic",
    ".vbhtml": "visual basic",
    ".vbs": "visual basic",
    ".volt": "volt",
    ".vue": "vue",
    ".owl": "web ontology language",
    ".wat": "webassembly",
    ".webidl": "webidl",
    ".x10": "x10",
    ".xc": "xc",
    ".xml": "xml",
    ".ant": "xml",
    ".axml": "xml",
    ".ccxml": "xml",
    ".clixml": "xml",
    ".cproject": "xml",
    ".csl": "xml",
    ".csproj": "xml",
    ".ct": "xml",
    ".dita": "xml",
    ".ditamap": "xml",
    ".ditaval": "xml",
    ".dll.config": "xml",
    ".dotsettings": "xml",
    ".filters": "xml",
    ".fsproj": "xml",
    ".fxml": "xml",
    ".glade": "xml",
    ".grxml": "xml",
    ".iml": "xml",
    ".ivy": "xml",
    ".jelly": "xml",
    ".jsproj": "xml",
    ".kml": "xml",
    ".launch": "xml",
    ".mdpolicy": "xml",
    ".mxml": "xml",
    ".nproj": "xml",
    ".nuspec": "xml",
    ".odd": "xml",
    ".osm": "xml",
    ".plist": "xml",
    ".props": "xml",
    ".ps1xml": "xml",
    ".psc1": "xml",
    ".pt": "xml",
    ".rdf": "xml",
    ".rss": "xml",
    ".scxml": "xml",
    ".srdf": "xml",
    ".storyboard": "xml",
    ".stTheme": "xml",
    ".sublime-snippet": "xml",
    ".targets": "xml",
    ".tmCommand": "xml",
    ".tml": "xml",
    ".tmLanguage": "xml",
    ".tmPreferences": "xml",
    ".tmSnippet": "xml",
    ".tmTheme": "xml",
    ".ui": "xml",
    ".urdf": "xml",
    ".ux": "xml",
    ".vbproj": "xml",
    ".vcxproj": "xml",
    ".vssettings": "xml",
    ".vxml": "xml",
    ".wsdl": "xml",
    ".wsf": "xml",
    ".wxi": "xml",
    ".wxl": "xml",
    ".wxs": "xml",
    ".x3d": "xml",
    ".xacro": "xml",
    ".xaml": "xml",
    ".xib": "xml",
    ".xlf": "xml",
    ".xliff": "xml",
    ".xmi": "xml",
    ".xml.dist": "xml",
    ".xproj": "xml",
    ".xsd": "xml",
    ".xul": "xml",
    ".zcml": "xml",
    ".xsp-config": "xpages",
    ".xsp.metadata": "xpages",
    ".xpl": "xproc",
    ".xproc": "xproc",
    ".xquery": "xquery",
    ".xq": "xquery",
    ".xql": "xquery",
    ".xqm": "xquery",
    ".xqy": "xquery",
    ".xs": "xs",
    ".xslt": "xslt",
    ".xsl": "xslt",
    ".xojo_code": "xojo",
    ".xojo_menu": "xojo",
    ".xojo_report": "xojo",
    ".xojo_script": "xojo",
    ".xojo_toolbar": "xojo",
    ".xojo_window": "xojo",
    ".xtend": "xtend",
    ".yml": "yaml",
    ".reek": "yaml",
    ".rviz": "yaml",
    ".sublime-syntax": "yaml",
    ".syntax": "yaml",
    ".yaml": "yaml",
    ".yaml-tmlanguage": "yaml",
    ".yang": "yang",
    ".y": "yacc",
    ".yacc": "yacc",
    ".yy": "yacc",
    ".zep": "zephir",
    ".zig": "zig",
    ".zimpl": "zimpl",
    ".zmpl": "zimpl",
    ".zpl": "zimpl",
    ".desktop": "desktop",
    ".desktop.in": "desktop",
    ".ec": "ec",
    ".eh": "ec",
    ".edn": "edn",
    ".fish": "fish",
    ".mu": "mupad",
    ".nc": "nesc",
    ".ooc": "ooc",
    ".rst": "restructuredtext",
    ".rest": "restructuredtext",
    ".rest.txt": "restructuredtext",
    ".rst.txt": "restructuredtext",
    ".wisp": "wisp",
    ".prg": "xbase",
    ".prw": "xbase",
}

export const LANGUAGE_TAG = {
    "c": "// the code file is written by C",
    "c++": "// the code file is written by C++",
    "cpp": "// the code file is written by C++",
    "c#": "// the code file is written by C#",
    "csharp": "// the code file is written by C#",
    "c-sharp": "// the code file is written by C#",
    "css": "/* the code file is written by CSS */",
    "cuda": "// the code file is written by Cuda",
    "dart": "// the code file is written by Dart",
    "lua": "// the code file is written by Lua",
    "objectivec": "// the code file is written by Objective-C",
    "objective-c": "// the code file is written by Objective-C",
    "objective-c++": "// the code file is written by Objective-C++",
    "python": "# the code file is written by Python",
    "perl": "# the code file is written by Perl",
    "prolog": "% the code file is written by Prolog",
    "swift": "// the code file is written by swift",
    "lisp": "; the code file is written by Lisp",
    "java": "// the code file is written by Java",
    "scala": "// the code file is written by Scala",
    "tex": "% the code file is written by TeX",
    "vue": "<!--the code file is written by Vue-->",
    "markdown": "<!--the code file is written by Markdown-->",
    "html": "<!--the code file is written by HTML-->",
    "php": "// the code file is written by PHP",
    "js": "// the code file is written by JavaScript",
    "javascript": "// the code file is written by JavaScript",
    "typescript": "// the code file is written by TypeScript",
    "go": "// the code file is written by Go",
    "shell": "# the code file is written by Shell",
    "rust": "// the code file is written by Rust",
    "sql": "-- the code file is written by SQL",
    "kotlin": "// the code file is written by Kotlin",
    "vb": "' the code file is written by Visual Basic",
    "ruby": "# the code file is written by Ruby",
    "pascal": "// the code file is written by Pascal",
    "r": "# the code file is written by R",
    "fortran": "!the code file is written by Fortran",
    "lean": "-- the code file is written by Lean",
    "matlab": "% the code file is written by Matlab",
    "delphi": "{the code file is written by Delphi}",
    "scheme": "; the code file is written by Scheme",
    "basic": "' the code file is written by Basic",
    "assembly": "; the code file is written by Assembly",
    "groovy": "// the code file is written by Groovy",
    "abap": "* the code file is written by Abap",
    "gdscript": "# the code file is written by GDScript",
    "haskell": "-- the code file is written by Haskell",
    "julia": "# the code file is written by Julia",
    "elixir": "# the code file is written by Elixir",
    "excel": "' the code file is written by Excel",
    "clojure": "; the code file is written by Clojure",
    "actionscript": "// the code file is written by ActionScript",
    "solidity": "// the code file is written by Solidity",
    "powershell": "# the code file is written by PowerShell",
    "erlang": "% the code file is written by Erlang",
    "cobol": "// the code file is written by Cobol",
    "alloy": "/* the code file is written by Alloy */",
    "awk": "// the code file is written by AWK",
    "thrift": "/* the code file is written by Thrift */",
    "sparql": "# the code file is written by SPARQL",
    "augeas": "// the code file is written by Augeas",
    "cmake": "# the code file is written by CMake",
    "f-sharp": "// the code file is written by F#",
    "stan": "// the code file is written by Stan",
    "isabelle": "(*the code file is written by Isabelle*)",
    "dockerfile": "# the code file is written by Dockerfile",
    "rmarkdown": "# the code file is written by RMarkdown",
    "literate-agda": "-- the code file is written by Literate Agda",
    "tcl": "// the code file is written by Augeas",
    "glsl": "// the code file is written by GLSL",
    "antlr": "// the code file is written by ANTLR",
    "verilog": "// the code file is written by Verilog",
    "racket": "; the code file is written by Racket",
    "standard-ml": "(*the code file is written byStandard ML*)",
    "elm": "-- the code file is written by Elm",
    "yaml": "# the code file is written by YAML",
    "smalltalk": "'' the code file is written by Smalltalk",
    "ocaml": "(*the code file is written by OCaml*)",
    "idris": "-- the code file is written by Idris",
    "visual-basic": "' the code file is written by Visual Basic",
    "protocol-buffer": "// the code file is written by Protocol Buffer",
    "bluespec": "// the code file is written by Bluespec",
    "applescript": "-- the code file is written by AppleScript",
    "makefile": "# the code file is written by Makefile",
    "tcsh": "# the code file is written by TCSH",
    "maple": "# the code file is written by Maple",
    "systemverilog": "// the code file is written by SystemVerilog",
    "literate-coffeescript": "# the code file is written by Literate CoffeeScript",
    "vhdl": "-- the code file is written by VHDL",
    "restructuredtext": ".. the code file is written by reStructuredText",
    "sas": "* the code file is written by SAS",
    "literate-haskell": "> the code file is written by Literate Haskell",
    "java-server-pages": "// the code file is written by Java Server Pages",
    "coffeescript": "# the code file is written by CoffeeScript",
    "emacs-lisp": "; the code file is written by Emacs Lisp",
    "mathematica": "// the code file is written by Mathematica",
    "xslt": "<!--the code file is written by XSLT-->",
    "zig": "// the code file is written by Zig",
    "common-lisp": "; the code file is written by Common Lisp",
    "stata": "* the code file is written by Stata",
    "agda": "-- the code file is written by Agda",
    "ada": "-- the code file is written by Ada",
    "jsx": "// the code file is written by JSX",
    "tsx": "// the code file is written by TypeScript with JSX",
}

