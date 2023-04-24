require 'fileutils'
require 'babel/source'
require 'babel/transpiler'

class PutBabelPolyfill < Liquid::Tag
  def initialize(tag_name, max, tokens)
     super
  end

  def render(context)
    File.read(File.join(::Babel::Source::PATH, "babel/polyfill.js"))
  end
end

class BabelBlock < Liquid::Block
  def initialize(tag_name, markup, tokens)
    super
  end

  def render(context)
    ::Babel::Transpiler.transform(super)['code']
  end
end

Liquid::Template.register_tag('putbabelpolyfill', PutBabelPolyfill)
Liquid::Template.register_tag('babel', BabelBlock)
