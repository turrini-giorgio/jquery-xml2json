xml2json = $.xml2json

describe 'with xml2json', ->

	it 'should expose $.xml2json', ->
		expect(xml2json).to.be.a('function')

	it 'should parse null', ->
		expect(xml2json(null)).to.be(null)

	it 'should parse empty string', ->
		expect(xml2json('')).to.be('')

	it 'should parse attributes', ->
		obj = xml2json '<test name="name" value="value"/>'
		expect(obj.$.name).to.be('name')
		expect(obj.$.value).to.be('value')

	it 'should parse element text content', ->
		obj = xml2json '<test>content</test>'
		expect(obj._).to.be('content')

	it 'should trim text content', ->
		obj = xml2json '<test>  content  </test>'
		expect(obj._).to.be('content')

	it 'should parse child elements', ->
		obj = xml2json '<test><child>first</child><child>second</child></test>'
		expect(obj.child).to.eql(['first', 'second'])

	it 'should parse empty child elements', ->
		obj = xml2json '<test><child/><child/></test>'
		expect(obj.child).to.eql(['', ''])

	it 'should parse child elements with attributes', ->
		obj = xml2json '<test><child name="one">first</child><child name="two">second</child></test>'
		expect(obj.child).to.eql([{$:{name:'one'},_:'first'}, {$:{name:'two'},_:'second'}])

	it 'should parse cdata block', ->
		obj = xml2json '<test><![CDATA[cdata...]]></test>'
		expect(obj._).to.be('cdata...')

	it 'should parse cdata block', ->
		obj = xml2json '<test><![CDATA[cdata...]]></test>'
		expect(obj._).to.be('cdata...')
