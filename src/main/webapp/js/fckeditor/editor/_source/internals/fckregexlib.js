var FCKRegexLib={AposEntity:/&apos;/gi,ObjectElements:/^(?:IMG|TABLE|TR|TD|TH|INPUT|SELECT|TEXTAREA|HR|OBJECT|A|UL|OL|LI)$/i,NamedCommands:/^(?:Cut|Copy|Paste|Print|SelectAll|RemoveFormat|Unlink|Undo|Redo|Bold|Italic|Underline|StrikeThrough|Subscript|Superscript|JustifyLeft|JustifyCenter|JustifyRight|JustifyFull|Outdent|Indent|InsertOrderedList|InsertUnorderedList|InsertHorizontalRule)$/i,BeforeBody:/(^[\s\S]*\<body[^\>]*\>)/i,AfterBody:/(\<\/body\>[\s\S]*$)/i,ToReplace:/___fcktoreplace:([\w]+)/ig,MetaHttpEquiv:/http-equiv\s*=\s*["']?([^"' ]+)/i,HasBaseTag:/<base /i,HasBodyTag:/<body[\s|>]/i,HtmlOpener:/<html\s?[^>]*>/i,HeadOpener:/<head\s?[^>]*>/i,HeadCloser:/<\/head\s*>/i,FCK_Class:/\s*FCK__[^ ]*(?=\s+|$)/,ElementName:/(^[a-z_:][\w.\-:]*\w$)|(^[a-z_]$)/,ForceSimpleAmpersand:/___FCKAmp___/g,SpaceNoClose:/\/>/g,EmptyParagraph:/^<(p|div|address|h\d|center)(?=[ >])[^>]*>\s*(<\/\1>)?$/,EmptyOutParagraph:/^<(p|div|address|h\d|center)(?=[ >])[^>]*>(?:\s*|&nbsp;|&#160;)(<\/\1>)?$/,TagBody:/></,GeckoEntitiesMarker:/#\?-\:/g,ProtectUrlsImg:/<img(?=\s).*?\ssrc=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi,ProtectUrlsA:/<a(?=\s).*?\shref=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi,ProtectUrlsArea:/<area(?=\s).*?\shref=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi,Html4DocType:/HTML 4\.0 Transitional/i,DocTypeTag:/<!DOCTYPE[^>]*>/i,HtmlDocType:/DTD HTML/,TagsWithEvent:/<[^\>]+ on\w+[\s\r\n]*=[\s\r\n]*?('|")[\s\S]+?\>/g,EventAttributes:/\s(on\w+)[\s\r\n]*=[\s\r\n]*?('|")([\s\S]*?)\2/g,ProtectedEvents:/\s\w+_fckprotectedatt="([^"]+)"/g,StyleProperties:/\S+\s*:/g,InvalidSelfCloseTags:/(<(?!base|meta|link|hr|br|param|img|area|input)([a-zA-Z0-9:]+)[^>]*)\/>/gi,StyleVariableAttName:/#\(\s*("|')(.+?)\1[^\)]*\s*\)/g,RegExp:/^\/(.*)\/([gim]*)$/,HtmlTag:/<[^\s<>](?:"[^"]*"|'[^']*'|[^<])*>/};