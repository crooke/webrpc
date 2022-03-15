package html

import (
	"bytes"
	"embed"
	"text/template"

	"github.com/pkg/errors"
	"github.com/webrpc/webrpc/gen"
	"github.com/webrpc/webrpc/schema"
)

func init() {
	gen.Register("html", &generator{})
}

// https://github.com/golang/go/issues/46056
//go:generate cp -r ../javascript/templates/. templates
//go:embed templates/*.tmpl
var templateFS embed.FS

type generator struct{}

func (g *generator) Gen(proto *schema.WebRPCSchema, opts gen.TargetOptions) (string, error) {
	// Load templates
	tmpl, err := template.
		New("webrpc-gen-html").
		Funcs(templateFuncMap(opts)).
		ParseFS(templateFS, "templates/*.tmpl")
	if err != nil {
		return "", errors.Wrap(err, "failed to parse html templates")
	}

	// generate deterministic schema hash of the proto file
	schemaHash, err := proto.SchemaHash()
	if err != nil {
		return "", err
	}

	// template vars
	vars := struct {
		*schema.WebRPCSchema
		SchemaHash string
		TargetOpts gen.TargetOptions
	}{
		proto, schemaHash, opts,
	}

	// Generate the template
	genBuf := bytes.NewBuffer(nil)
	err = tmpl.ExecuteTemplate(genBuf, "proto_html", vars)
	if err != nil {
		return "", err
	}

	return genBuf.String(), nil
}
