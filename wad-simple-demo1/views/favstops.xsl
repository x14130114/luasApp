<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
			</head>
			<body>
				<table class="table">
					<tr>
						<th>Stop Name</th>
						<th>Line</th>
						<th>Abrev</th>
					</tr>
					<xsl:for-each select="favstops/stop">
							<tr>
								<td>
									<xsl:value-of select="name"/>
								</td>
								<td>
									<xsl:value-of select="line"/>
								</td>
								<td>
									<xsl:value-of select="abrev"/>
								</td>
							</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>