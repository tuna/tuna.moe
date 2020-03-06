module Liquid
  class FileExistsCondition < Condition
    def initialize(path)
      @path = path
    end

    def evaluate(context = Context.new)
      path = Template.parse(@path).render context
      return locate_include_file(context, path)
    end

    def locate_include_file(context, file)
      site_source = context.registers[:site].config['source']
      file_path = site_source + '/' + file
      return File.exist?(file_path.strip!)
    end

    def tag_includes_dirs(context)
      context.registers[:site].includes_load_paths.freeze
    end
  end

  class IfFileExists < Block
    def initialize(tag_name, markup, options)
      super
      @blocks = []
      push_block('iffileexists'.freeze, markup)
    end
    
    def nodelist
      @blocks.map(&:attachment)
    end

    def parse(tokens)
      while parse_body(@blocks.last.attachment, tokens)
      end
    end

    def unknown_tag(tag, markup, tokens)
      if tag == 'else'.freeze
        push_block(tag, markup)
      else
        super
      end
    end

    def render(context)
      context.stack do
        @blocks.each do |block|
          if block.evaluate(context)
            return block.attachment.render(context)
          end
        end
        ''.freeze
      end
    end

    private

    def push_block(tag, markup)
      block = if tag == 'else'
        ElseCondition.new
      elsif tag == 'iffileexists'
        FileExistsCondition.new(markup)
      else
        raise(SyntaxError.new("tag '#{tag}' not supported"))
      end
      @blocks.push(block)
      block.attach(BlockBody.new)
    end
  end
end

Liquid::Template.register_tag('iffileexists'.freeze, Liquid::IfFileExists)
