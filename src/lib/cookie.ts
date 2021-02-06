import { NextPageContext } from 'next';

class DefaultConverter {
  static read(value) {
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  }
  static write(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
}

const assign = (target, ...args) => {
  for (let i = 1; i < args.length; i++) {
    const source = args[i];
    for (const key in source) target[key] = source[key];
  }
  return target;
};

type Attributes = {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict';
};

class Init {
  converter: any;
  defaultAttributes: Attributes;

  constructor(converter, defaultAttributes: Attributes) {
    this.converter = converter;
    this.defaultAttributes = defaultAttributes;
  }

  set(
    ctx: NextPageContext | null,
    key: string,
    value: string,
    attributes?: Attributes
  ) {
    attributes = assign({}, this.defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      const expires = new Date(Date.now() + attributes.expires * 864e5);
      attributes.expires = <any>expires.toUTCString();
    }

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    value = this.converter.write(value, key);

    let stringifiedAttributes = '';
    for (const attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue;
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    const val = key + '=' + value + stringifiedAttributes;

    if (ctx) ctx?.res?.setHeader('set-cookie', val);
    else return (document.cookie = val);
  }

  getString(ctx) {
    return ctx ? ctx.req.headers['cookie'] : document.cookie;
  }

  get(ctx: NextPageContext | null, key?: string) {
    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    const cookies = ctx
      ? ctx.req.headers['cookie'].split('; ')
      : document.cookie.split('; ');
    const jar = {};

    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split('=');
      let value = parts.slice(1).join('=');

      if (value[0] === '"') value = value.slice(1, -1);

      try {
        var foundKey = DefaultConverter.read(parts[0]);
        jar[foundKey] = this.converter.read(value, foundKey);

        if (key === foundKey) break;
      } catch (e) {}
    }

    return key ? jar[key] : jar;
  }

  remove(ctx: NextPageContext | null, key: string, attributes: Attributes) {
    this.set(
      ctx,
      key,
      '',
      assign({}, attributes, {
        expires: -1,
      })
    );
  }

  withAttributes(attributes: Attributes) {
    return new Init(
      this.converter,
      assign({}, this.defaultAttributes, attributes)
    );
  }

  withConverter(converter) {
    return new Init(
      assign({}, this.converter, converter),
      this.defaultAttributes
    );
  }
}

export const Cookie = new Init(DefaultConverter, { path: '/' });
export default Cookie;
