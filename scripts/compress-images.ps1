# Script PowerShell para comprimir imagens usando ImageMagick ou conversão nativa
# Requer: imagemagick instalado ou usar conversão nativa do Windows

$imagesPath = "public\images"
$quality = 85

Write-Host "🚀 Iniciando compressão de imagens..." -ForegroundColor Green

function Compress-Image {
    param(
        [string]$ImagePath,
        [int]$Quality = 85
    )
    
    $file = Get-Item $ImagePath
    $originalSize = $file.Length
    $extension = $file.Extension.ToLower()
    $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($ImagePath)
    $directory = $file.DirectoryName
    
    # Tenta usar ImageMagick se disponível
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        $outputPath = Join-Path $directory "$nameWithoutExt.webp"
        & magick $ImagePath -quality $Quality -resize "1920x1080>" $outputPath 2>&1 | Out-Null
        
        if (Test-Path $outputPath) {
            $newSize = (Get-Item $outputPath).Length
            $reduction = [math]::Round((($originalSize - $newSize) / $originalSize) * 100, 1)
            Write-Host "✅ $($file.Name): $([math]::Round($originalSize/1KB, 2))KB → $([math]::Round($newSize/1KB, 2))KB ($reduction% redução)" -ForegroundColor Green
            return $true
        }
    }
    
    Write-Host "⚠️  ImageMagick não encontrado. Instale para compressão automática." -ForegroundColor Yellow
    Write-Host "   Ou use ferramentas online como: https://squoosh.app/" -ForegroundColor Yellow
    return $false
}

# Processa todas as imagens
Get-ChildItem -Path $imagesPath -Recurse -Include *.png,*.jpg,*.jpeg | ForEach-Object {
    Compress-Image -ImagePath $_.FullName -Quality $quality
}

Write-Host "`n✨ Processo concluído!" -ForegroundColor Green
Write-Host "💡 Dica: Para melhor compressão, use ferramentas online como:" -ForegroundColor Cyan
Write-Host "   - https://squoosh.app/" -ForegroundColor Cyan
Write-Host "   - https://tinypng.com/" -ForegroundColor Cyan
