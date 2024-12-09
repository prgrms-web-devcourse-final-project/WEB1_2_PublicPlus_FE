# 대소문자 수정을 위한 PowerShell 스크립트

# Git 설정 변경
git config core.ignorecase false

# 캐시 삭제
git rm -r --cached .

# src 폴더 내의 모든 파일과 폴더를 재귀적으로 처리하는 함수
function Fix-CaseSensitivity {
    param (
        [string]$path
    )
    
    # 현재 경로의 모든 항목(파일과 폴더)을 가져옴
    Get-ChildItem -Path $path -Recurse | ForEach-Object {
        $currentPath = $_.FullName
        $parentPath = $_.Directory.FullName
        $name = $_.Name
        
        # 첫 글자를 대문자로 변경
        $newName = (Get-Culture).TextInfo.ToTitleCase($name)
        
        if ($name -ne $newName) {
            # 임시 이름으로 변경
            $tempName = "$name`_temp"
            Rename-Item -Path $currentPath -NewName $tempName -Force
            
            # 최종 이름으로 변경
            Rename-Item -Path (Join-Path $parentPath $tempName) -NewName $newName -Force
            
            Write-Host "Processed: $name -> $newName"
        }
    }
}

# src 폴더 처리 실행
Fix-CaseSensitivity -path "src"

# Git에 변경사항 추가
git add .

# 빌드 캐시 삭제
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
}
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force node_modules/.cache
}

Write-Host "Process completed. Please run 'npm install' and restart your development server."