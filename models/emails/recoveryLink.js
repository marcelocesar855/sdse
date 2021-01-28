module.exports = {
    render(data) {
        let url = `${process.env.APP_FRONDEND_URL}/recuperar_senha/${data.token}`;

        return `
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>SDSE</title>
                </head>
                <body>
                    <div style="font-size:16px;background-color:#fdfdfd;margin:0;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;line-height:1.5;height:100%!important;width:100%!important">
                <table bgcolor="#fdfdfd" style="box-sizing:border-box;border-spacing:0;width:100%;background-color:#fdfdfd;border-collapse:separate!important" width="100%">
                    <tbody>
                        <tr>
                            <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td>
                            <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important" valign="top" width="600">
                                <div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px">
                                    <div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px">
                                        <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="left" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top"><span><a href="" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none" target="_blank" >
                                                        
                                                    <h1 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">SDSE</h1></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0">
                                        <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top">
                                                        <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                                                                        <h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">Redefinir Senha</h2>
                                                                        <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Você está recebendo este e-mail porque recebemos um pedido de redefinição de senha para sua conta.</p>
                                                                    </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top">
                                                                                        <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top">
                                                                                                        <a href="${url}" style="box-sizing:border-box;border-color:#B0E0E6;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#ff914d;border:solid 1px #ff914d;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">Redefinir Senha</a>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                                                                        <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:300">Se você não solicitou uma reinicialização da senha, nenhuma ação adicional será necessária.</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                            <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
                </body>
            </html>	
        `;
    }
}