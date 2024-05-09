export const URL_ACCESS_TOKEN_DOCS =
  "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens";

export const CONFIRM_PUSH_FORM = `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Push Confirmation</title>
<style>
    body {
        font-family: Arial, sans-serif;
    }
    .container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
    .form-group {
        margin-bottom: 15px;
    }
    label {
        display: block;
        margin-bottom: 5px;
    }
    input[type="text"],
    textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
    }
    .btn-group {
        display: flex;
        justify-content: space-between;
    }
    .btn {
        padding: 8px 15px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    .btn-finish {
        background-color: #4CAF50;
        color: #fff;
    }
    .btn-cancel {
        background-color: #f44336;
        color: #fff;
    }
</style>
</head>
<body>
    <div class="container">
        <h2>Push Confirmation</h2>
        <div class="form-group">
            <label for="branchName">Branch Name:</label>
            <input type="text" id="branchName" name="branchName" placeholder="Enter branch name">
        </div>
        <div class="form-group">
            <label for="commitMessage">Commit Message:</label>
            <textarea id="commitMessage" name="commitMessage" rows="5" placeholder="Enter commit message"></textarea>
        </div>
        <div class="btn-group">
        <button class="btn btn-cancel" onclick="cancelPush()">Cancel</button>
        <button class="btn btn-finish" onclick="pushConfirm()">Finish</button>
        </div>
    </div>

    <script>
        function pushConfirm() {
            const branchName = document.getElementById('branchName').value;
            const commitMessage = document.getElementById('commitMessage').value;
            // Perform push confirmation logic here
            console.log('Branch Name:', branchName);
            console.log('Commit Message:', commitMessage);
            // You can replace the console.log with actual logic to handle the push confirmation
        }

        function cancelPush() {
            console.log('Push canceled');
            parent.postMessage({ pluginMessage: { type: 'UI_CLOSE' } }, '*');
        }
    </script>
</body>
</html>

  `;
